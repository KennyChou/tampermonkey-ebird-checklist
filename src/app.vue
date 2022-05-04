<template>
  <div class="Page-section-inner Page-section-inner--md">
    <div v-if="ebirdKey == ''">
      <label>
        <span
          >輸入<a href="https://ebird.org/api/keygen" target="_block"
            >eBird API</a
          ></span
        >
        <input type="text" v-model="inputkey" />
      </label>
      <button @click="saveKey" class="Button Button--highlight">儲存</button>
    </div>
    <div v-if="Object.keys(sp_info).length == 0">
      <label>
        <span>鳥名顯示方式</span>
        <select v-model="lang">
          <option value="zh_TW">中文俗名</option>
          <option value="en">英文俗名</option>
        </select>
        <button @click="loadSp" class="Button Button--highlight">
          下載鳥名錄
        </button>
      </label>
    </div>
    <div v-if="checklist.length > 0">
      <button @click="download" class="Button Button--highlight">
        下載選取清單 {{ checklist.size }}
      </button>
    </div>
    <div v-if="info">
      <p v-html="message"></p>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { AppName, AppVersion } from './config'
import { breeding_code } from './data/breeding_code'

export default {
  name: 'app',
  data() {
    return {
      AppName,
      AppVersion,
      sp_info: {},
      checklist: [],
      breeding_code,
      inputkey: '',
      ebirdKey: '',
      lang: 'zh_TW',
      pro_code: {
        P20: 'eBird - Casual Observation',
        P21: 'eBird - Stationary Count',
        P22: 'eBird - Traveling Count',
        P23: 'eBird - Exhaustive Area Count',
      },
      info: false,
      message: '',
    }
  },
  mounted() {
    this.genDownloadButton()
  },
  created() {
    this.ebirdKey = localStorage.getItem('ebirdKey') || ''
    this.sp_info = JSON.parse(localStorage.getItem('sp_info') || '{}')
  },
  methods: {
    genDownloadButton() {
      const elements = document.getElementsByClassName('kenny-checkbox')
      while (elements.length > 0) elements[0].remove()

      if (Object.keys(this.sp_info).length == 0 || this.ebirdKey == '') {
        return
      }
      try {
        const lis = document
          .getElementById('place-species-observed-results')
          .getElementsByClassName(
            'ResultsStats ResultsStats--manageMyChecklists'
          )
        for (const element of lis) {
          const id = element.id.split('-')[1]
          const input = document.createElement('input')
          input.type = 'checkbox'
          input.value = id
          input.className = 'kenny-checkbox'
          input.addEventListener('change', e => this.selected(e))
          element
            .getElementsByClassName('Color-text-neutral-4 u-text-3')[0]
            .prepend(input)
        }
      } catch (e) {
        this.info = true
        this.message = e
      }
      this.info = false
    },
    selected(e) {
      this.$set(
        this,
        'checklist',
        [...document.querySelectorAll('.kenny-checkbox:checked')].map(
          item => item.value
        )
      )
    },
    array2object(items) {
      const ret = items.reduce((result, item) => {
        const key = Object.keys(item)[0]
        result[key] = item[key]
        return result
      })
      return ret
    },
    async loadSp() {
      this.info = true
      this.message = '正在下載鳥名錄中...'
      const reps = await this.$http.get(
        `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=${this.lang}`
      )
      this.sp_info = this.array2object(
        reps.data.map(item => {
          var sp = {}
          sp[item['speciesCode']] = {
            c: item['comName'],
            s: item['sciName'],
            o: item['taxonOrder'],
          }
          return sp
        })
      )
      localStorage.setItem('sp_info', JSON.stringify(this.sp_info))
      this.message = '儲存成功'
      this.genDownloadButton()
    },
    saveKey() {
      localStorage.setItem('ebirdKey', this.inputkey)
      this.ebirdKey = this.inputkey
      this.genDownloadButton()
      this.info = false
    },
    async getLoc(locId) {
      try {
        let locresp = await this.$http.get(
          `https://api.ebird.org/v2/ref/hotspot/info/${locId}`,
          {
            headers: {
              'X-eBirdApiToken': this.ebirdKey,
            },
          }
        )
        return locresp.data
      } catch (error) {
        return undefined
      }
    },
    async download(id) {
      this.info = true
      this.message = ''
      var data = []
      for (const c of this.checklist) {
        try {
          this.message = this.message + `下載Checklist [${c}]...<br />`
          let resp = await this.$http.get(
            `https://api.ebird.org/v2/product/checklist/view/${c}`,
            {
              headers: {
                'X-eBirdApiToken': this.ebirdKey,
              },
            }
          )

          const ret = resp.data

          const locdata = await this.getLoc(ret['locId'])

          for (const obs of ret['obs']) {
            const sp = this.sp_info[obs['speciesCode']]
            data.push({
              'Submission ID': ret['subId'],
              'Common Name': sp['c'],
              'Scientific Name': sp['s'],
              'Taxonomic Order': sp['t'],
              Count: obs['howManyAtmost'],
              'State/Province': ret['subnational1Code'],
              County: '',
              'Location ID': ret['locId'],
              Location: locdata ? locdata['name'] : '',
              Latitude: locdata ? locdata['latitude'] : '',
              Longitude: locdata ? locdata['longitude'] : '',
              Date: ret['obsDt'].split(' ')[0],
              Time: ret['obsDt'].split(' ')[1],
              Protocol: this.pro_code[ret['protocolId']],
              'Duration (Min)': ret['durationHrs']
                ? parseInt(parseFloat(ret['durationHrs']) * 60)
                : '',
              'All Obs Reported': ret['allObsReported'] ? 1 : 0,
              'Distance Traveled (km)': ret['effortDistanceKm']
                ? ret['effortDistanceKm']
                : '',
              'Area Covered (ha)': ret['effortAreaHa']
                ? ret['effortAreaHa']
                : '',
              'Number of Observers': ret['numObservers'],
              'Breeding Code': obs['obsAus']
                ? this.breeding_codes[obs['obsAux'][0]['auxCode']]
                : '',
              'Observation Details': obs['comments'] ? obs['comments'] : '',
              'Checklist Comments': ret['comments'] ? ret['comments'] : '',
            })
          }
        } catch (error) {
          this.message = `ebirdKey 有問題 [${error}]<br />`
          this.ebirdKey = ''
          localStorage.removeItem('ebirdKey')
          this.checklist.clear()
          this.genDownloadButton()
          return
        }
      }
      this.message = this.message + `產生Excel...<br/>`
      const checklistsheet = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, checklistsheet, 'sheet1')
      const filename = `checklist_${new Date().valueOf()}.xlsx`
      this.message = this.message + `開始下載<br/>`
      XLSX.writeFile(wb, filename)

      this.info = false
    },
  },
}
</script>
