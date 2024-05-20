import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  owner: string;
  photo: string;
  deleted_at: string;
  account: Account;
}

export interface Account {
  id: number;
  name: string;
  users: User[];
  contacts: Contact[];
  organizations: Organization[];
}

export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  organization_id: number;
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  contacts: Contact[];
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
