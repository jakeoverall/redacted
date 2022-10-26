import { CasesController } from "./Controllers/CasesController.js";

class App {
  casesController = new CasesController()
}

window["app"] = new App();
