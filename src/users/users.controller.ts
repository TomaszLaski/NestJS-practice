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
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDataService } from './users-data.service';
import { mapUserToExternal } from './helpers/map-user-to-external.helper';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Post()
  addUser(@Body() item: CreateUserDto): ExternalUserDto {
    return mapUserToExternal(this.userRepository.addUser(item));
  }

  @Get(':id')
  getUserById(@Param('id') id): ExternalUserDto {
    return mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get()
  getAllUser(): Array<ExternalUserDto> {
    return this.userRepository
      .getAllUsers()
      .map((item) => mapUserToExternal(item));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id): void {
    return this.userRepository.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() dto: UpdateUserDto): ExternalUserDto {
    return mapUserToExternal(this.userRepository.updateUser(id, dto));
  }
}
