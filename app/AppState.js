import { Case } from "./Models/Case.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
import { wordList } from "./WordLists.js"

class AppState extends EventEmitter {
  classifiedWords = ["sky", "skies", "ocean", "extraterrestrial", "triangle", "alien", "ufo", "spaceship", "news", "unidentified", "flying", "fly", ...wordList.slice(800)]

  clearanceLevels = [{
    name: "Super Top Secret",
    code: "👽👾🤖🤖👻👹"
  }, {
    name: "Top Secret",
    code: "😷💉🧟‍♂️👻"
  }, {
    name: "Secret",
    code: "🤝🤫"
  }, {
    name: "None",
    code: ""
  }]

  /**@type import('./Models/Case.js').Case[] */
  cases = loadState('cases', [Case])

  /**@type import('./Models/Case.js').Case | null */
  activeCase = null

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})



