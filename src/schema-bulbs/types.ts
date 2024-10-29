export interface SchemaBulb {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  min_value: number;
  max_value: number;
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}
