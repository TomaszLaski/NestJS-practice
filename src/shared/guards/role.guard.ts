import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userRole = context.switchToHttp().getRequest().headers;
    if (
      userRole === Roles.ADMIN ||
      userRole === Roles.SELLER ||
      userRole === Roles.CUSTOMER
    )
      return true;
  }
}
