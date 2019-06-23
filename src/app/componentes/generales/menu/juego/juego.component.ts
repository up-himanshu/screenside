import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/interface/generales/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
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
  player: Usuario[] = [];public NumeroPantalla;
  constructor(private userService: UsuarioService, private playerService: JugadorService) {
    this.NumeroPantalla=0;
   }
public datos:any
public cargando=false;

  ngOnInit() {  
    
    
    this.playerService.conectar();
    this.playerService.currentMessage.subscribe(isOpen  => {

      this.datos = isOpen ;
      
      if(isOpen.length != 0 )
      {
          this.Pantalla();
          this.cargando=true;
      }
      else
      {

      }
      

    });

    
      this.NumeroPantalla=0;
    
      
    
  }

  



  private Inicio_partida (datos_partida)
  {
    if (datos_partida[0].pantallaActiva==0)
    {
       alert("Esperando partida");
    }
    else
    {
        if(this.NumeroPantalla != this.datos[0].pantallaActiva)
        {
          this.Replay();
      
        }
    }
  } 
  
   public Pantalla () {
   

  
      if( this.datos[1].Pantalla1==true && this.NumeroPantalla ==0)
      {
        this.NumeroPantalla =2;
        this.datos[1].Patalla2=true;
        this.datos[0].pantallaActiva=1;
        this.Inicio_partida(this.datos); 

      }
      else
      {
        this.NumeroPantalla =1;
        this.datos[1].Patalla1=true;
       
      }
   
  }

  
 public cerrar(){
    
    this.playerService.desconectar();
  }

  
  public Replay()
  {
  
    var box = document.getElementById('boat');
     this.cantidad =0;
     this.cantidadPadingleft =0;
     box.style.left='0px';
     box.style.paddingLeft='0px';
     var x =setInterval(()=>{
  
  
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
            clearInterval(x);
            if(this.NumeroPantalla)
            {

            }
            else
            {

            }
            this.datos.pantallaActiva 
        
          }
         
  
        
         
      }
      else 
      {
        box.style.left=  this.cantidad + "px";
          this.cantidad++;
      }
      
    },10);
    
  }


  ngOnDestroy(): void {
   this.cerrar();
  }
}
