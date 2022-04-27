import { Roles } from '../../enums/roles.enum';

interface UserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address?: Array<UserAddress>;
  roles: Roles;
}
