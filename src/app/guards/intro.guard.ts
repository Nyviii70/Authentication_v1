// Page de vérification : voir si l'utilisateur a vu l'introduction et sinon afficher la page
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const INTRO_KEY = 'intro-seen';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router){ }

  async canLoad(): Promise<boolean> {

    // le guard vérifie si l'utilisateur a vu l'introduction et le montre
    const hasSeenIntro = await Storage.get({key: INTRO_KEY})

    // le guard revient à "true" et la page s'affiche
    if(hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return true;
    }
    
  }
}
