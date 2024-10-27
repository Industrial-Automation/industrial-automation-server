export interface ControlSwitch {
  id: string;
  screen_id: string;
  value: boolean;
  title: string;
  description: string | null;
  editable: boolean;
  created_at: string;
  last_updated_at: string;
}
