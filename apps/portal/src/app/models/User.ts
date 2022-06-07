export interface User {
  _id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  phone: string;
  photo_url: string;
  banned_from_date: any;
  banned_to_date: any;
  roles: { name: string }[];
  moderated_university: any;
  moderated_university_id: number;
}
