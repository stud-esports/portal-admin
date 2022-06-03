export interface News {
  _id: number;
  title: string;
  description: string | null;
  main_image_url: string | null;
  createdAt: string | Date;
  updatedAt: string;
}
