import { Strategy } from 'passport-cookie'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      cookieName: 'idToken',
      signed: true
    });
  }

  async validate(token: string): Promise<string> {
    const user = token

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}