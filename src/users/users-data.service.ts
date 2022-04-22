import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
var shortid = require('shortid');

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(newUser: CreateUserDto): User {
    newUser.id = shortid.generate();
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

  getAllUsers(): Array<User> {
    return this.users;
  }
}
