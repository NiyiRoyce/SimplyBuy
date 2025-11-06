import { Controller, Get, Query, Param, Delete, ForbiddenException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoansService } from './loans.service';

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

// --- LoansController ---
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // Get all loans - role-aware
  @Get()
  async getAll(@User() user: AuthUser) {
    return this.loansService.findAll(user.role);
  }

  // Get expired loans
  @Get('expired')
  async getExpired() {
    return this.loansService.findExpired();
  }

  // Get loans by user email
  @Get(':userEmail/get')
  async getByUser(@Param('userEmail') email: string, @User() user: AuthUser) {
    // Optional: add access control, e.g., only admin or the user themselves
    if (user.role === 'staff' && user.email !== email) {
      throw new ForbiddenException('Access denied');
    }
    const data = await this.loansService.findByEmail(email);
    return { loans: data };
  }

  // Get loans by status - role-aware
  @Get('filter')
  async getByStatus(@Query('status') status: string, @User() user: AuthUser) {
    return this.loansService.findByStatus(status, user.role);
  }

  // Delete a loan - role-aware
  @Delete(':loanId/delete')
  async deleteLoan(@Param('loanId') id: string, @User() user: AuthUser) {
    // Optional: restrict deletion to admins only
    if (user.role !== 'admin' && user.role !== 'superAdmin') {
      throw new ForbiddenException('Access denied');
    }
    return this.loansService.deleteLoan(id, user.role);
  }
}
