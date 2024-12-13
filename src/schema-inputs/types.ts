export interface SchemaInput {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}

export interface TrendsArchive {
  id: string;
  screen_id: string;
  title: string;
  value: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}
