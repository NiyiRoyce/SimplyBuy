import { Injectable, ForbiddenException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Applicant {
  name: string;
  email: string;
  telephone: string;
  totalLoan?: string; // optional so we can hide it for staff
}

interface Loan {
  id: string;
  amount: string;
  maturityDate: string;
  status: 'pending' | 'active' | string;
  applicant: Applicant;
  createdAt: string;
}

@Injectable()
export class LoansService {
  private loans: Loan[];

  constructor() {
    // Load the JSON file dynamically from the data folder
    const path = join(__dirname, '../../../data/loans.json');
    this.loans = JSON.parse(readFileSync(path, 'utf8')) as Loan[];
  }

  // Fetch all loans, hide totalLoan for normal staff
  async findAll(userRole: string): Promise<Loan[]> {
    if (userRole === 'staff') {
      return this.loans.map(l => ({
        ...l,
        applicant: { ...l.applicant, totalLoan: undefined },
      }));
    }
    return this.loans;
  }

  // Filter loans by status
  async findByStatus(status: string, userRole: string): Promise<Loan[]> {
    let filtered: Loan[] = this.loans.filter(l => l.status === status);

    if (userRole === 'staff') {
      filtered = filtered.map(l => ({
        ...l,
        applicant: { ...l.applicant, totalLoan: undefined },
      }));
    }

    return filtered;
  }

  // Fetch loans by applicant email
  async findByEmail(email: string): Promise<Loan[]> {
    return this.loans.filter(l => l.applicant.email === email);
  }

  // Fetch expired loans
  async findExpired(): Promise<Loan[]> {
    const now = new Date();
    return this.loans.filter(l => new Date(l.maturityDate) < now);
  }

  // Delete a loan (superAdmin only)
  async deleteLoan(id: string, role: string) {
    if (role !== 'superAdmin') {
      throw new ForbiddenException('Only superAdmin can delete loans');
    }

    this.loans = this.loans.filter(l => l.id !== id);
    return { message: 'Loan deleted successfully' };
  }
}
