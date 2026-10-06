import api from '../../../api/axios';

import type { User } from '../types/user.types';

async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>('/users/', {
    params: {
      page: 1,
      size: 100,
      sort: 'first_name',
      active: 'true',
    },
  });

  return response.data;
}

const userService = {
  getUsers,
};

export default userService;
