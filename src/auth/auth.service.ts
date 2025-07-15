import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async signup(email: string, password: string) {
    const existingUser = await this.usersRepo.findOne({ where: { email } });
    if (existingUser) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ email, password: hashed });
    return this.usersRepo.save(user);
  }

  async signin(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
