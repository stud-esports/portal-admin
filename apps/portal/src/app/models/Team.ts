import { Game } from "./Game";
import { User } from "./User";

export interface Team {
  _id: number;
  title: string;
  description: string;
  team_type: string;
  game_id: string;
  captain_id: string;
  main_image_url: string;
  members_count: string;
  game: Game;
  captain: User
  members: User[]
}
