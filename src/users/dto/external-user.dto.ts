import { Roles } from 'src/enums/roles.enum';
import { UserAddress } from './address-user.dto';

export interface ExternalUserDto {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  type: Array<Roles>;
  address: Array<UserAddress>;
}
