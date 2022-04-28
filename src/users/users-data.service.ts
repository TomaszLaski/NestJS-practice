import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(newUser: CreateUserDto): User {
    newUser.id = uuidv4();
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((item) => id === item.id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  updateUser(id: string, dto: UpdateUserDto): User {
    this.users = this.users.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          updatedAt: new Date(),
        };
      }

      return i;
    });

    return this.getUserById(id);
  }

  getUserById(id: string): User {
    let itemFound = this.users.find((item) => {
      if (item.id === id) return true;
    });
    return itemFound;
  }

  getUserByEmail(email: string): User {
    let emailFound = this.users.find((emailFound) => {
      if (emailFound.id === email) return true;
    });
    return emailFound;
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
