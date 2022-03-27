import { User } from "./User";

export interface Contact {
  _id: number;
  user: User;
  user_id: string
  position: string;
  questions: string;
}