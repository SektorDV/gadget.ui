import Axios from "axios";
import { MACHINE_LIST_URL } from "config";

export class API {
  static async fetchMachineList() {
    try {
      return await Axios({
        method: "GET",
        url: MACHINE_LIST_URL,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async fetchServicesList({ machineId = "0" } = {}) {
    try {
      return await Axios({
        method: "GET",
        url: `${MACHINE_LIST_URL}/${machineId}`,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
