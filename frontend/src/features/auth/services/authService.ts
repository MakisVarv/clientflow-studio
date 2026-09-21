import api from '../../../api/axios';

export type LoginRequest = {
  email: string;
  password: string;
};
export type AuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
};
export type LoginResponse = {
  access_token: string;
  message: string;
  user: AuthUser;
};

async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', data);

  return response.data;
}

const authService = {
  login,
};

export default authService;
