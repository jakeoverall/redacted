import { appState } from "../AppState.js";
import { casesService } from "../Services/CasesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { shake } from "../Utils/Shake.js";
import { setHTML } from "../Utils/Writer.js";

let timer = null
let countdown = null

function drawActiveCase() {
  if (appState.activeCase) {
    setHTML('app', appState.activeCase.RedactedReportComponent)
  }
}

function drawCases() {
  let template = ''
  appState.cases.forEach(c => template += c.CaseTriggerComponent)
  setHTML('cases', template)
}

function drawDeclassifiedCase() {
  if (appState.activeCase) {
    setHTML('app', appState.activeCase.DeclassifiedReportComponent)
  }

  clockFeature();
}



export class CasesController {
  constructor() {
    appState.on('activeCase', drawActiveCase)
    appState.on('cases', drawCases)
    drawCases()
  }

  addCase() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const caseData = getFormData(form)
      casesService.addCase(caseData)
    } catch (error) {
      Pop.error(error)
    }
  }

  setActiveCase(id) {
    casesService.setActiveCase(id)
  }

  async declassifyReport() {
    try {
      const code = await Pop.prompt('Please type in the required code to declassify this Report')
      casesService.verifyCode(code)
      drawDeclassifiedCase()
    } catch (error) {
      Pop.error(error)
      shake(document.body)
    }
  }

  save() {
    const textarea = document.querySelector('textarea')
    if (!textarea) { return }
    casesService.saveCaseReport(textarea.value)
  }
}

// Stretch Goal
function clockFeature() {
  const threeMins = 60 * 1000 * 1;
  timer = setTimeout(drawActiveCase, threeMins);
  countdown = setInterval(tick, 100);
  const endTime = new Date(new Date().getTime() + (threeMins));
  let timerElem = document.getElementById('timer');
  function tick() {
    timerElem.innerHTML = `<span>${Math.floor((endTime.getTime() - Date.now()) / 1000)} <span class="mdi-spin">🕛</span></span>`;
  }
}
