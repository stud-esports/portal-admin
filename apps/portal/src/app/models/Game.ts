export interface Game {
  _id: number;
  title: string;
  description: string;
  genre: string;
  main_image_url?: string;
  short_title: string;
  store_url?: string;
  background_image_url?: string;
}
