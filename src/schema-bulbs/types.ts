export interface SchemaBulb {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  warning_min_value: number | null;
  warning_max_value: number | null;
  critical_min_value: number | null;
  critical_max_value: number | null;
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}
