import { Strategy } from 'passport-cookie'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      cookieName: 'auth',
      signed: true
    });
  }

  async validate(token: { idToken: string}): Promise<string> {
    const idToken = token?.idToken

    if (!idToken) {
      throw new UnauthorizedException()
    }

    return idToken
  }
}