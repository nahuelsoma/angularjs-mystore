export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // for security purposes, password must not be returned by the backend
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
