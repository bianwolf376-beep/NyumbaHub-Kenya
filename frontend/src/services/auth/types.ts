export type UserRole =
  | 'ADMIN'
  | 'LANDLORD'
  | 'TENANT';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  phone: string;

  county: string;
  town: string;

  password: string;

  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  county: string;
  town: string;
  role: UserRole;
  verified: boolean;
  profilePhoto?: string | null;
}