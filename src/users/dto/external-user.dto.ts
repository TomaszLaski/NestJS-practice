import { Roles } from 'src/shared/enums/roles.enum';
import { UserAddress } from './address-user.dto';

export interface ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<UserAddress>;
  roles: Roles;
}
