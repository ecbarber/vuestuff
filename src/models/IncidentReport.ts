import type { tPerson } from "./tPerson";
import type { IncidentHistory } from "./IncidentHistory";
import { isDate } from "@vue/shared";

export interface iIncidentReport {
  _id?: string;
  location: string;
  created_by: string;
  created_date: string;
  lastupdated_by: string;
  lastupdated_date: string;
  reporting_party: string;
  reporting_party_email: string;
  status: string;
  status_other: string;
  severity: string;
  severity_other: string;
  specific_location: string;
  incident_date: string;
  is_deleted: Boolean;
  incident_description: string;
  persons: Array<tPerson>;
  history?: Array<IncidentHistory>;
  isDirty?: Boolean;
  isNew?: Boolean;
  isLoading?: Boolean;
  assigned_to?: String;
}

export class IncidentReport implements iIncidentReport {
  _id?: string = "";
  location: string = "";
  created_by: string = "";
  created_date: string = "";
  lastupdated_by: string = "";
  lastupdated_date: string = "";
  reporting_party: string = "";
  reporting_party_email: string = "";
  status: string = "";
  status_other: string = "";
  severity: string = "";
  severity_other: string = "";
  specific_location: string = "";
  incident_date: string = "";
  is_deleted: Boolean = false;
  incident_description: string = "";
  persons: Array<tPerson> = new Array<tPerson>();
  history?: Array<IncidentHistory> = new Array<IncidentHistory>();
  isDirty?: Boolean = false;
  isNew?: Boolean = false;
  isLoading?: Boolean = false;
  assigned_to?: String;
}
