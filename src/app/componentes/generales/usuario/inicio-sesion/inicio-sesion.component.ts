import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "src/app/servicios/autenfificacion.service";
import { first } from "rxjs/operators";
import { Usuario } from "src/app/interface/generales/usuario";
import { AlertComponent } from "ngx-bootstrap/alert/alert.component";

@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrls: ["./inicio-sesion.component.css"]
})
export class InicioSesionComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  currentUser: Usuario;
  success: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["perfil"]);
    }
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "perfil";

    //show success message on registration
    if (this.route.snapshot.queryParams["registered"]) {
      this.success = "Registration Successful.";
      this.addSuccess();
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.error) {
      this.addError();
    }

    // reset alerts on submit
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // console.log(this.returnUrl);
    this.loading = true;
    this.authenticationService
      .login(this.f.usuario.value, this.f.contrasena.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  // Alerts
  alerts: any[] = [];

  addSuccess() {
    this.alerts.push({
      type: "info",
      msg: `${this.success}`,
      timeout: 5000
    });
  }

  addError() {
    this.alerts.push({
      type: "info",
      msg: `${this.error}`,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
