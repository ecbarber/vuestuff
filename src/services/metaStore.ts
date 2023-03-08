import { reactive } from "vue";
import type { tLocation } from "@/models/tLocation";
import type { tStatus } from "@/models/tStatus";
import type { tSeverity } from "@/models/tSeverity";
import type { tPersonClass } from "@/models/tPersonClass";
import type { tPersonRole } from "@/models/tPersonRole";
import type { Role } from "@/models/Role";
import type { User } from "../models/User";
import { getAllLocations } from "../services/locationService";
import { getSeverityList } from "../services/severityService";
import { getStatusList } from "../services/statusService";
import { getItemList } from "./personClassService";
import { getRoleList } from "./personRoleService";
import { getList } from "./roleService";
import { getTreatmentTypeList } from "./treatmentTypeService";
import type { tTreatmentType } from "@/models/tTreatmentType";
import { getAllUsers } from "./userService";

export const MetaStore = reactive({
  locationList: Array<tLocation>(),
  statusList: Array<tStatus>(),
  severityList: Array<tSeverity>(),
  personClassList: Array<tPersonClass>(),
  personRoleList: Array<tPersonRole>(),
  treatmentTypeList: Array<tTreatmentType>(),
  userList: Array<User>(),
  roleList: Array<Role>(),
  async loadAsync() {
    await getAllLocations().then((result) => {
      this.locationList = result.DATA;
    });
    await getSeverityList().then((result) => {
      this.severityList = result.DATA;
    });
    await getStatusList().then((result) => {
      this.statusList = result.DATA;
    });
    await getItemList().then((result) => {
      this.personClassList = result.DATA;
    });
    await getRoleList().then((result) => {
      this.personRoleList = result.DATA;
    });
    await getTreatmentTypeList().then((result) => {
      this.treatmentTypeList = result.DATA;
    });
    await getList().then((result) => {
      this.roleList = result.DATA;
    });
    getAllUsers().then((result) => {
      this.userList = result.DATA;
    });
  },
});
