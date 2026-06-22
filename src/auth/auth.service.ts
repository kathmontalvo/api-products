import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  // user test
  private userTest = {
    id: 1,
    email: 'user@email.com',
    passwordHash: 'adsadfsad',
    role: 'ADMIN'
  }

  constructor(
    private JwtService: JwtService
  ) { }

  // Login method
  async login(email: string, password: string) {

    // 1. Validar si existe o no el usuario
    if (email !== this.userTest.email) {
      throw new UnauthorizedException('User or password invalid')
    }

    // 2. Validar contraseña
    const passwordValid = password === 'Admin12345';
    if (!passwordValid) {
      throw new UnauthorizedException('User or password invalid')
    }

    const payload = {
      sub: this.userTest.id,
      email: this.userTest.email,
      role: this.userTest.role
    }

    return {
      access_token: await this.JwtService.signAsync(payload)
    }
  }

}
