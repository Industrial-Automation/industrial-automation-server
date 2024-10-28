export interface ControlGauge {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  min_value: number;
  max_value: number;
  interval_value: number;
  unit: string;
  editable: boolean;
  created_at: string;
  last_updated_at: string;
}
