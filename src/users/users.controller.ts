import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
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
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalUserDto {
    return mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get('email')
  getUserByEmail(@Param('email') email: string): ExternalUserDto {
    return this.userRepository.getUserByEmail(email);
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
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): ExternalUserDto {
    return mapUserToExternal(this.userRepository.updateUser(id, dto));
  }
}
