export type tIncidentReport = {
  _id?: String;
  location: String;
  created_by: String;
  created_date: String;
  lastupdated_by: String;
  lastupdated_date: String;
  reporting_party: String;
  reporting_party_email: String;
  status: string;
  severity: String;
  specific_location: String;
  incident_date: String;
  is_deleted?: Boolean;
};
