export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface RegisterDto {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: "TENANT" | "LANDLORD";
  }
  
  export interface AuthResponse {
    access_token: string;
    user: User;
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: "ADMIN" | "LANDLORD" | "TENANT";
  }