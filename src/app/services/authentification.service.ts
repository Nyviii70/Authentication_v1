// logique d'authentification
// ici, tout est factice mais il est possible de connecter une API
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';

import { BehaviorSubject, from, Observable } from 'rxjs';

const USER_TOKEN = 'userToken';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  // le BehaviorSubject et initialisé (null) car le guard va l'intercepter en premier
  isAuthentificated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  // demande de token qui sera stocké localement
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    // donne une valeur différente selon le status de connexion
    const token = await Storage.get({ key: USER_TOKEN });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      // si connecté : true
      this.isAuthentificated.next(true);
    } else {
      // si déconnecté : false
      this.isAuthentificated.next(false);
    }
  }

  login(credentials: { email; password }): Observable<any> {
    // vérifie dans l'api si les identifiants (credentials) existent
    return this.http.post('localhost:7000/authentication', credentials).pipe(
      // on récupère data qui vient de l'api
      // data contient token
      map((data: any) => data.token),
      // ici from sert à transformer une promesse en observable
      switchMap((token) => {
        // on transforme l'objet ({{key: USER_TOKEN, value: token}) en observable
        // Storage.set = stocke dans la mémoire du navigateur (localStorage ?)
        return from(Storage.set({ key: USER_TOKEN, value: token }));
      }),
      tap((_) => {
        this.isAuthentificated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthentificated.next(false);
    return Storage.remove({ key: USER_TOKEN });
  }
}
