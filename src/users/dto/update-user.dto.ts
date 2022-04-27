import { Roles } from '../../enums/roles.enum';
import { Transform, Type } from 'class-transformer';
import { arrayToDate } from '../../shared/helpers/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsDate,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsDate()
  // @IsNotEmpty()
  // dateOfBirth: Array<number>;

  // kod z kodilli, niestety nie działa, pojawia się błąd, do konsultacji co jest powodem
  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  address?: Array<UpdateUserAddressDto>;

  @IsEnum(Roles)
  roles: Roles;
  id: string;
}

export class UpdateUserAddressDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
