// pour connecter l'utilisateur automatiquement en vérifiant si l'utilisateur actuel est authentifié
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { map,take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthentificationService, private router: Router) {}
  
  canLoad(): Observable<boolean> {
    return this.authService.isAuthentificated.pipe(
      filter(val => val !== null),
      // pour que l'observable s'rrête au premier résultat
      take(1),
      map(isAuthentificated => {
        // si l'utilisateur est authentifié, il accède directement à l'application
        if (isAuthentificated) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true});
        } else {
          return true;
        }
      })
    )
  }
}
