export type Email = string | null;

export type Msg = string | null;

export interface Admin {
  name: string;
  email: string;
  password: string;
}

export interface Employee {
  id: number;
  name: string;
  contact: number;
  email: string;
  salary: number;
}
