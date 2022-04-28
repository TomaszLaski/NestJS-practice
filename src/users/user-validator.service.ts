import { Injectable, Param, Get } from '@nestjs/common';
import { ExternalUserDto } from './dto/external-user.dto';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { User } from './interfaces/users.interface';
import { UsersDataService } from './users-data.service';

@Injectable()
export class UserValidatorService {
  private users: Array<User> = [];
  userRepository: any;
  constructor(userRepository: UsersDataService) {}

  @Get('email')
  getUserByEmail(@Param('email') email: string): ExternalUserDto {
    return this.userRepository.getUserByEmail(email);
  }
  validateUniqueEmail(email): void {
    throw new UserRequireUniqueEmailException();
  }
}
