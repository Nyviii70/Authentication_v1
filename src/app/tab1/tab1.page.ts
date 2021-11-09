import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private authService: AuthentificationService, private router: Router) {}

  // pour le logout
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});
  }
}
