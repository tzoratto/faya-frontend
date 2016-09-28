import {Injectable}       from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
}                           from '@angular/router';
import {AuthService} from '../utils/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isAdmin = this.authService.getUser().isAdmin();
        if (!isAdmin) {
            this.router.navigate(['']);
        }
        return isAdmin;
    }
}
