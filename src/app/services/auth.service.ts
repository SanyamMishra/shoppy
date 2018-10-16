import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable} from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  get firebaseAuthUser$() {
    return this.afAuth.authState;
  }

  login() {
    // login with Google
    // if successfull then Promise resolves to true
    // other Promise resolves to false
    return new Promise((resolve) => {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(result => {
          // if this is a new user save it in firebase
          this.userService.save(result.user);
          resolve(true);
        })
        .catch(error => resolve(false));
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
