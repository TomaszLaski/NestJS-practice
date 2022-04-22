import { arrayToDate } from "src/shared/helpers/date.helper";
import { ExternalUserDto } from "../dto/external-user.dto";
import { User } from "../interfaces/users.interface";


export const mapUserToExternal = (user: User): ExternalUserDto {
  return {
    ...user,
    birthDate: arrayToDate(user.birthDate),
  };
}