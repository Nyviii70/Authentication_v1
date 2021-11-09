// sécuriser les pages de l'application
// canLoad est utilisé pour la protection
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { map, take } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthentificationService, private router: Router) {}

  canLoad(): Observable<boolean> {
      return this.authService.isAuthentificated.pipe(
        // on filtre la valeur (null) à l'intérieur du guard pour éviter les problèmes d'accès aux pages
        filter(val => val !== null),
        // pour que l'observable s'arrête à un résultat
        take(1),
        map(isAuthenticated => {
          console.log('GUARD: ', isAuthenticated)
          if (isAuthenticated) {
            return true
          } else {
            this.router.navigateByUrl('/login')
            return false
          }
        })
      )
  }
}
