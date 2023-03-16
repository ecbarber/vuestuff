export interface iAttachment {
  _id: String;
  incidentId: String;
  file_name: String;
  description: String;
  file_type: String;
  created_by: String;
  created_date: String;
  lastupdated_by: String;
  lastupdated_date: String;
  file_data: String;
}

export class Attachment implements iAttachment {
  _id: String = "";
  incidentId: String = "";
  file_name: String = "";
  description: String = "";
  file_type: String = "";
  created_by: String = "";
  created_date: String = "";
  lastupdated_by: String = "";
  lastupdated_date: String = "";
  file_data: String = "";
}
