export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  last_updated_at: string;
  created_at: string;
  verification_code: number;
  is_confirmed: boolean;
}
