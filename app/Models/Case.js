import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

/**
 * @param {string} word
 */
function redactOrKeepWord(word) {
  try {
    const found = appState.classifiedWords.find(w => {
      let reg = new RegExp(w, 'ig')
      return reg.test(word)
    })
    // @ts-ignore
    return found ? word.replaceAll(/\w/g, '⬛') : word
  } catch (error) {
    console.log(word)
  }

}

export class Case {
  constructor(data) {
    this.id = data.id || generateId()
    this.date = data.date
    this.agent = data.agent
    this.clearance = data.clearance
    this.agency = data.agency
    this.report = data.report || ''
  }

  get redactedReport() {
    const words = this.report.split(' ')
    return words.map(redactOrKeepWord).join(' ')
  }


  get RedactedReportComponent() {
    return /*html*/`
      <div class="report-container ${this.clearance.split(' ').join('-')}">
        <textarea class="report redacted" readonly>${this.redactedReport}</textarea>
        <div class="report-footer">
          <button class="btn" onclick="app.casesController.declassifyReport()">Declassify Report</button>
        </div>
      </div>
    `
  }

  get DeclassifiedReportComponent() {
    return /*html*/`
      <div class="report-container ${this.clearance.split(' ').join('-')}">
        <textarea class="report">${this.report}</textarea>
        <div class="report-footer d-flex align-items-center">
          <button class="btn" onclick="app.casesController.save()">Save Report</button>
          <div id="timer">3:00</div>
        </div>
      </div>
    `
  }


  get CaseTriggerComponent() {
    return /*html*/`
      <div onclick="app.casesController.setActiveCase('${this.id}')" class="selectable p-1 mb-2" data-bs-dismiss="offcanvas">
        <p class="mb-0">
          <b>File: ${this.agency}-${this.id.substring(0, 6)}</b>
        </p>
      </div>
    `
  }

}