// page de connection de l'utilisateur
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      // on indique dans le array qu'il y a un validateur et quel type de validateur
      // à la place des '' il est possible d'écrire quelque chose qui sera affiché par défaut dans le champ
      email: ['', [Validators.required, Validators.email]],
      // le (6) = nombre de caractères minimum
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async(res) => {
        await loading.dismiss();
        // la clé replaceUrl servira dans le cas où l'utilisateur irait chercher l'URL dans son historique
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      // navigation "vers l'arrière" avec alert si le login est mauvais
      async(res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }
// entrée des informations de login
  get email(){
    return this.credentials.get ('email')
  }

  get password() {
    return this.credentials.get('password')
  }
}
