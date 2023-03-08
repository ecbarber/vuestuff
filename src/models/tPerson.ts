export type tPerson = {
  _id?: String;
  first_name: String;
  last_name: String;
  email: String;
  phone_number: String;
  created_by: String;
  created_date: String;
  lastupdated_by: String;
  lastupdated_date: String;
  is_deleted?: Boolean;
  person_story: String;
  person_class: String;
  person_role: String;
  person_class_other: String;
  person_role_other: String;
  stage_name: String;
  treatment_type: String;
};

export interface iPerson {
  _id?: String;
  first_name: String;
  last_name: String;
  email: String;
  phone_number: String;
  created_by: String;
  created_date: String;
  lastupdated_by: String;
  lastupdated_date: String;
  is_deleted?: Boolean;
  person_story: String;
  person_class: String;
  person_role: String;
  person_class_other: String;
  person_role_other: String;
  stage_name: String;
  treatment_type: String;
}

export class Person {
  _id?: String = "";
  first_name: String = "";
  last_name: String = "";
  email: String = "";
  phone_number: String = "";
  created_by: String = "";
  created_date: String = "";
  lastupdated_by: String = "";
  lastupdated_date: String = "";
  is_deleted?: Boolean = false;
  person_story: String = "";
  person_class: String = "";
  person_role: String = "";
  person_class_other: String = "";
  person_role_other: String = "";
  stage_name: String = "";
  treatment_type: String = "";
}
