import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/interface/generales/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { AuthenticationService } from '../../../../servicios/autenfificacion.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { promise } from 'protractor';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit, OnDestroy{
  
  public cantidad =0;
  public cantidadPadingleft =0;
  public barcoActivo = false;
  player: Usuario[] = [];
  public mostrarBar = false;
  public NumeroPantalla;
  
  constructor(private userService: UsuarioService, private playerService: JugadorService,
    private authenticationService: AuthenticationService) {
    
    this.currentUser = authenticationService.currentUserValue;
   }
public datos:any = 
{
  'display_active':-1
}
public cargando=false;
private currentUser: Usuario;
  ngOnInit() {  
    
    this.NumeroPantalla = 0;
    this.playerService.conectar();
    this.playerService.currentMessage.subscribe(isOpen  => {

     this.datos = isOpen ;
      if (this.datos.spin<=3){
     
      
      if(isOpen.length != 0 )
      {
        if( this.NumeroPantalla==1 || this.NumeroPantalla==2 || this.NumeroPantalla==0 ){
          this.mostrarBar = false;
          this.Pantalla();
          this.cargando=true;
            this.Inicio_partida();
            }

          
        }
      else
      {

      }
    }
    });
  
  }

  



  private Inicio_partida ()
  {
    if(this.datos.screenone && this.datos.screentwo)
    {
    if (this.datos.display_active==0)
    {
       
    }
    else
    {
        if(this.NumeroPantalla == this.datos.display_active)
        {
          this.barcoActivo = true;
          this.Replay();
      
        }
      }
  }
  } 
  
   public Pantalla () {
   

  
      if( this.datos.screenone==true )
      {
     
        if (this.NumeroPantalla==0)
        {
        
        this.NumeroPantalla =2;
        this.datos.screentwo=true;
         this.datos.display_active=1;
         this.playerService.ActualizarDatos(this.datos);
        // this.Inicio_partida(this.datos); 
        }
        else
        {
          
        }

      }
      else
      {
        
        this.NumeroPantalla =1;
        this.datos.screenone=true;
        this.playerService.ActualizarDatos(this.datos);
       
      }
      
     
      
   
  }

  
 public cerrar(){
    
    this.playerService.desconectar();
  }

  p
  
  public Replay()
  {
  
    var box = document.getElementById('boat');
     this.cantidad =0;
     this.cantidadPadingleft =0;
     box.style.left='0px';
     box.style.paddingLeft='0px';
     var interval;
     if(this.NumeroPantalla==this.datos.display_active){
      this.mostrarBar = true;

     interval = setInterval(()=>{
  
  
      var box = document.getElementById('boat');
      
  
      if(!(screen.width-199>=this.cantidad))
      {
  
        if(screen.width>=this.cantidad)
        {
  
          box.style.paddingLeft= this.cantidadPadingleft + "px";
          this.cantidadPadingleft++;
          this.cantidad++; 
        }
        else
        {
            clearInterval(interval);
            if(this.NumeroPantalla==1)
            {
              clearInterval(interval);
              this.datos.display_active =2
              this.playerService.ActualizarDatos(this.datos);
            }
            else
            
            {
              clearInterval(interval);
              this.datos.display_active =1
                this.datos.spin++;  
              this.playerService.ActualizarDatos(this.datos);
              
            }
           
        
          }
         
  
        
         
      }
      else 
      {
        box.style.left=  this.cantidad + "px";
          this.cantidad++;
      }
      
    },1);
  }
  else
  {
    clearInterval(interval);
  }
  }


  ngOnDestroy(): void {
   this.cerrar();
  }
}
