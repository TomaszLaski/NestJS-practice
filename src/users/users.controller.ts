import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { arrayToDate, dateToArray } from 'src/shared/helpers/date.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/users.interface';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Post()
  addUser(@Body() item: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birthDate: arrayToDate(user.birthDate),
    };
  }

  @Get(':id')
  getUserById(@Param('id') id): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get()
  getAllUser(): Array<User> {
    return this.userRepository.getAllUsers();
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id): void {
    return this.userRepository.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() dto: UpdateUserDto): UpdateUserDto {
    return this.userRepository.updateUser(id, dto);
  }
}
