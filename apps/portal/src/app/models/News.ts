export interface News {
  _id: number;
  title: string;
  description: string;
  text: string;
  watch_count: number;
  status: string;
  main_image_url: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  university_id: number | null;
  event_id: number | null;
  user_id: number;
}
