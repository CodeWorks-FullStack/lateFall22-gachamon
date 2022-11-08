import { GachamansController } from "./Controllers/GachamansController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  gachamansController = new GachamansController()
}

window["app"] = new App();
