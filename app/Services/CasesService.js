import { appState } from "../AppState.js"
import { Case } from "../Models/Case.js"
import { saveState } from "../Utils/Store.js"

class CasesService {
  verifyCode(code) {
    let clearance = appState.clearanceLevels.find(l => l.name == appState.activeCase.clearance)
    if (clearance.code != code) {
      throw new Error('Invalid Code')
    }
  }
  saveCaseReport(report) {
    if (report.includes('⬛')) { return }
    appState.activeCase.report = report
    saveState('cases', appState.cases)
  }
  setActiveCase(id) {
    appState.activeCase = appState.cases.find(c => c.id == id)
  }

  addCase(caseData) {
    const newCase = new Case(caseData)
    appState.cases.push(newCase)
    appState.emit('cases')
    saveState('cases', appState.cases)
  }

}

export const casesService = new CasesService()