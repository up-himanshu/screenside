import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { first } from 'rxjs/operators';
import { Usuario } from 'src/app/interface/generales/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private authenticationService: AuthenticationService
  
  ) { }

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
    this.authenticationService.register(this.f.correo.value, this.f.contrasena.value,this.f.usuario.value)
      .pipe(first())
      .subscribe(
              data => {
                // console.log('I get there')
                   this.router.navigate([this.returnUrl]);
              },
              error => {
                // Error que viene del servidor con 
                  this.error = error;
                  this.loading = false;
              });
    }
}
