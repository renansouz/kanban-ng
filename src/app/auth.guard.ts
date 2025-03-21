import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((subscriber) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        subscriber.next(true); 
      } else {
        subscriber.next(false);
        router.navigate(['/login']); 
      }
      subscriber.complete(); 
    });
  }).pipe(take(1)); 
};
