import { Roles } from '../../shared/enums/roles.enum';

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
  dateOfBirth: Date;
  address?: Array<UserAddress>;
  roles: Roles;
}
