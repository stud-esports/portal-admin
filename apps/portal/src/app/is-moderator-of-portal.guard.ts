import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class IsModeratorOfPortalGuard implements CanActivate {
  constructor(private _userService: UsersService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._userService.isCurrentUserIsNotModeratorOfUniversity()) {
      return true;
    } else {
      this._router.navigateByUrl('/');
      return false;
    }
  }
}
