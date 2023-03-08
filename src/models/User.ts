import type { Role } from "../models/Role";

export class User {
  _id?: String;
  first_name: String = "";
  last_name: String = "";
  email: String = "";
  phone_number: String = "";
  cell_phone_number: String = "";
  created_by: String = "";
  created_date: String = "";
  lastupdated_by: String = "";
  lastupdated_date: String = "";
  is_deleted?: Boolean = false;
  roles: String[] = [];
  user_name: String = "";
  home_location: String = "";
  public get full_name() {
    return `${this.first_name} ${this.last_name}`;
  }
}
