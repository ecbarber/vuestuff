import { reactive } from "vue";
import { getAllLocations } from "../services/locationService";
import { getSeverityList } from "../services/severityService";
import { getStatusList } from "../services/statusService";
import { getItemList } from "./personClassService";
export class MetaStore {
    locationList = Array();
    statusList = Array();
    severityList = Array();
    personClassList = Array();
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
