import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";


// Token is required
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// Token is not required but we still want to access the current user
@Injectable()
export class GqlUserGuard extends GqlAuthGuard {
  handleRequest(err: any, user: any) {
    if (err) {
      throw err
    }

    return user
  }
}