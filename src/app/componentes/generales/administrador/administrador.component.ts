import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/servicios/autenfificacion.service";
import { Usuario } from "src/app/interface/generales/usuario";
import { Router } from "@angular/router";
import { AdministracionService } from "src/app/servicios/administracion.service";
import { first } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-administrador",
  templateUrl: "./administrador.component.html",
  styleUrls: ["./administrador.component.css"]
})
export class AdministradorComponent implements OnInit {
  amount: number;
  singleForm: FormGroup;
  games;
  errors = "";
  submitted = false;
  private currentUser: Usuario;
  constructor(
    private authService: AuthenticationService,
    private adminService: AdministracionService,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = this.authService.currentUserValue;
    this.games = this.adminService.currentGameValue;
  }

  ngOnInit() {
    this.singleForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
    if (this.currentUser) {
      //this.adminService.sgetGame();
      this.games = this.adminService.getGames();

      /*
      this.adminService.currentGame.subscribe(
        getgames => {
          this.games = getgames;
        }
      )*/
      /*
      this.adminService.sgetGame();      
     this.adminService.currentGame.subscribe(
        getgames => {
          this.games = getgames;
        })
        console.log(this.adminService.currentGameValue)*/
    }
  }

  get f() {
    return this.singleForm.controls;
  }

  createGame() {
    console.log(this.games);
    this.submitted = true;
    this.errors = null;
    if (this.singleForm.invalid) {
      return;
    }
    //this.adminService.createGame(this.f.name.value)
    this.adminService.screateGame(this.f.name.value);
    this.games = this.adminService.getGames();
    //this.adminService.sgetGame();
    /*
    this.adminService.createGame(this.f.name.value)
    .pipe(first())
    .subscribe(
      data => {                
        // this.router.navigate([this.returnUrl])
   },
      error => {
        this.errors = error
      }
    );*/

    //this.singleForm.reset();
    //this.submitted = false;
  }

  deleteGame(game) {
    this.adminService.sdeleteGame(game.id);
    this.games = this.adminService.getGames();
    //this.adminService.sgetGame();
    /*this.adminService.deleteGame(game.id)
    .pipe(first())
    .subscribe(
      data => {                
        // this.router.navigate([this.returnUrl]);
   },
      error => {
        this.errors = error
      }
    );    */
  }

  /*
  getGames(){
    this.adminService.getGames()
    .pipe(first())
    .subscribe(
      data => {
      
      },
      error => {
        this.error = error;
      }

    )
  }*/
}
