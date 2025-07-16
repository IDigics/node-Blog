import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    console.log(user.email + ': Signed up successfully')

    return {id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    message: 'Signed up successfully',
  };
  }

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    session.role = user.isAdmin ? 'admin' : 'user';
    
    return { message: 'Signed in successfully' };
  }

  @Post('signout')
  signOut(@Session() session: Record<string, any>) {
    session.userId = null;
    return { message: 'Signed out' };
  }
}
