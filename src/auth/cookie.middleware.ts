
import { Request, Response } from 'express';
import * as Iron from '@hapi/iron'

export function cookie(secret: string) {
  return async function (req: Request, _res: Response, next: Function) {
    if (!req.cookies && !req.headers.cookie) {
      return next()
    }

    const cookies = req.cookies ?? req.headers.cookie
    const unsealed = cookies['a0:session'] ? await Iron.unseal(cookies['a0:session'], secret, Iron.defaults) : {}
    req.signedCookies = unsealed
    next()
  }
}