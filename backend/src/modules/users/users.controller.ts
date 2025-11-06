import { Controller, Get, Param, ForbiddenException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersService } from './users.service';

// --- User decorator and interface ---
export interface AuthUser {
  email: string;
  role: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// --- UsersController ---
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users - accessible only to admin and superAdmin
  @Get()
  async getAll(@User() user: AuthUser) {
    if (user.role !== 'admin' && user.role !== 'superAdmin') {
      throw new ForbiddenException('Access denied');
    }
    return this.usersService.findAll();
  }

  // Get single user by email
  @Get(':email')
  async getUser(@Param('email') email: string, @User() user: AuthUser) {
    if (user.role === 'staff' && user.email !== email) {
      throw new ForbiddenException('Access denied');
    }
    const foundUser = await this.usersService.findUserByEmail(email);
    if (!foundUser) return { message: 'User not found' };

    const { password, ...result } = foundUser; // hide password
    return result;
  }
}
