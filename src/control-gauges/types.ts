export interface ControlGauge {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  minValue: number;
  maxValue: number;
  intervalValue: number;
  unit: string;
  editable: boolean;
  created_at: string;
  last_updated_at: string;
}
