import { Roles } from 'src/enums/roles.enum';
import { UserAddress } from './address-user.dto';

export interface UpdateUserDto {
  id: string;
  name: string;
  email: string;
  birthDate: Array<number>;
  type: Array<Roles>;
  address: Array<UserAddress>;
}
