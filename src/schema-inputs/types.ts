export interface SchemaInput {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  unit: string;
  width: number;
  height: number;
  coords: string;
  created_at: string;
  last_updated_at: string;
}
