import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  save(user: firebase.User) {
    this.afs.collection<User>('users').doc(user.uid).valueChanges().pipe(take(1)).subscribe(queryUser => {
      if (queryUser) {
        const updatingUser = {
          name: user.displayName,
          email: user.email
        };
        this.afs.collection<User>('users').doc(user.uid).update(updatingUser);
      } else {
        const newUser: User = {
          name: user.displayName,
          email: user.email,
          isAdmin: false
        };
        this.afs.collection<User>('users').doc(user.uid).set(newUser);
      }
    });
  }

  get$(firebaseAuthUser$: Observable<firebase.User>): Observable<User> {
    return firebaseAuthUser$.pipe(
      switchMap(user => {
        if (!user)
          return of<User>(null);
        return this.afs.collection<User>('users').doc(user.uid).valueChanges() as Observable<User>;
      })
    );
  }
}
