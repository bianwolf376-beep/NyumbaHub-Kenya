import api from './axios';
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
} from './types';

const AUTH_BASE = '/auth';

export const AuthService = {
  login(data: LoginDto) {
    return api.post<AuthResponse>(
      `${AUTH_BASE}/login`,
      data,
    );
  },

  register(data: RegisterDto) {
    return api.post<void>(
      `${AUTH_BASE}/register`,
      data,
    );
  },

  me() {
    return api.get<User>(
      `${AUTH_BASE}/me`,
    );
  },

  logout() {
    return api.post<void>(
      `${AUTH_BASE}/logout`,
    );
  },

  refresh() {
    return api.post<AuthResponse>(
      `${AUTH_BASE}/refresh`,
    );
  },

  forgotPassword(email: string) {
    return api.post<void>(
      `${AUTH_BASE}/forgot-password`,
      {
        email,
      },
    );
  },

  resetPassword(
    token: string,
    password: string,
  ) {
    return api.post<void>(
      `${AUTH_BASE}/reset-password`,
      {
        token,
        password,
      },
    );
  },
};