import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  public appUser$: Observable<User>;

  constructor(public authService: AuthService, public userService: UserService, private router: Router) {
    this.appUser$ = this.userService.get$(this.authService.firebaseAuthUser$);
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']));
  }

  disableAdminAccess() {
    this.userService.disableAdminAccess(this.authService.firebaseAuthUser$);
  }

  enableAdminAccess() {
    this.userService.enableAdminAccess(this.authService.firebaseAuthUser$);
  }

}
