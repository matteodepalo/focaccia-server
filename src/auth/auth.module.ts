import { Module } from '@nestjs/common'
import { CookieStrategy } from './cookie.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PassportModule],
  providers: [CookieStrategy]
})
export class AuthModule {}
