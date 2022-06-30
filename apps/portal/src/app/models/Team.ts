import { Game } from './Game';
import { User } from './User';

export interface Team {
  _id: number;
  title: string;
  description: string;
  team_type: string;
  game_id: string;
  captain_id: string;
  logo_url: string;
  members_count: string;
  university_id?: number;
  game: Game;
  captain: User;
  members: User[];
  university: any;
}
