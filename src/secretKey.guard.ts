import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SecretKeyGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (process.env.SECRET_KEY === undefined) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const body = request.body;
        const secret = body.secret;

        if (secret === process.env.SECRET_KEY) {
            return true;
        }

        return false;
    }
}

@Injectable()
export class SecretGetKeyGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (process.env.SECRET_KEY === undefined) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const query = request.query;
        const secret = query.secret;

        if (secret === process.env.SECRET_KEY) {
            return true;
        }

        return false;
    }
}
