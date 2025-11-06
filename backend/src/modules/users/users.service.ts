import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export type UserRole = 'staff' | 'admin' | 'superAdmin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    // Load staff.json dynamically
    const path = join(__dirname, '../../../data/staff.json');
    this.users = JSON.parse(readFileSync(path, 'utf8')) as User[];
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  // Return all users
  async findAll(): Promise<User[]> {
    return this.users;
  }
}
