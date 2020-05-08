import * as jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { Request, Response } from 'express'

export function jwtMiddleware(domain: string, audience: string) {
  return async function (req: Request, res: Response, next: Function) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
      }),

      audience: audience,
      issuer: `https://${domain}/`,
      algorithm: 'RS256',
    })(req, res, err => {
      if (err) {
        const status = err.status || 500
        const message =
          err.message || 'Sorry, we were unable to process your request.'
        return res.status(status).send({
          message
        })
      }
      return next()
    })
  }
}