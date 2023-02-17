import { reactive } from "vue";
import type { tLocation } from "@/models/tLocation";
import type { tStatus } from "@/models/tStatus";
import type { tSeverity } from "@/models/tSeverity";
import type { tPersonClass } from "@/models/tPersonClass";
import { getAllLocations } from "../services/locationService";
import { getSeverityList } from "../services/severityService";
import { getStatusList } from "../services/statusService";
import { getItemList } from "./personClassService";

export class MetaStore {
  public locationList = Array<tLocation>();
  public statusList = Array<tStatus>();
  public severityList = Array<tSeverity>();
  public personClassList = Array<tPersonClass>();
  constructor() {
    getAllLocations().then((result) => {
      this.locationList = result.DATA;
    });
    getSeverityList().then((result) => {
      this.severityList = result.DATA;
    });
    getStatusList().then((result) => {
      this.statusList = result.DATA;
    });
    getItemList().then((result) => {
      this.personClassList = result.DATA;
    });
  }
}
