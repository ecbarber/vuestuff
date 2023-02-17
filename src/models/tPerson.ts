export type tPerson = {
  _id?: String;
  first_name: String;
  last_name: String;
  email: String;
  phone_number: String;
  person_class: String;
  created_by: String;
  created_date: String;
  lastupdated_by: String;
  lastupdated_date: String;
  is_deleted?: Boolean;
  person_story: String;
  secondary_person_classes: String[];
};
