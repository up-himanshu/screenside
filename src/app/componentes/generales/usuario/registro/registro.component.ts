import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { first } from 'rxjs/operators';
import { Usuario } from 'src/app/interface/generales/usuario';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  // returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,   
    private userService: UsuarioService,
   private router: Router,
   private authenticationService: AuthenticationService
  
  ) { 
    //redirect to home if already logged in
    if(this.authenticationService.currentUserValue){
    this.router.navigate(['perfil']);
  }}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      usuario: ['',Validators.required],
      contrasena: ['',[Validators.required, Validators.minLength(6)]],
      correo: ['',[Validators.required, Validators.email]]
    });
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/'], {queryParams: {registered:true}});
      },
      error => {
        this.error = error;
        this.loading = false;
      });   
    }
    // Alerts
    alerts: any[] = [];
   
    add(): void {
      this.alerts.push({
        type: 'info',
        msg: `${this.error}`,
        timeout: 5000
      });
    }
   
    onClosed(dismissedAlert: AlertComponent): void {
      this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }
}
