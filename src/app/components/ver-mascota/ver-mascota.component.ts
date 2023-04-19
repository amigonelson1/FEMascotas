import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent {
  loading: boolean = false;
  id: number;

  mascota!: Mascota;

  //implementamos el servicio en el constructor y add una clase para traerno el id de la seleccion;
  constructor(private _mascotaService: MascotaService,
    private aRoute: ActivatedRoute) {
    //add '+' al inicio para volver el resultado a numero;
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  //primera forma de hacer el llamado;
  ngOnInit(): void {
    this.obtenerMascota();
  }

  obtenerMascota() {
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe({
      next: (data) => {
        this.mascota = data,
          this.loading = false
      },
      error: (e) => console.log(e),
      complete: () => { }
    })
  }

  /*  //otra forma de hacer el llamado (PIPE ASYNC);
   mascota$!: Observable<Mascota>
 
   ngOnInit(): void {
     this.mascota$ = this._mascotaService.getMascota(this.id)
   }
 
   // y en el 'ngIf' de nuestra etiqueta donde se refleja el resultado le ponemos lo siguiente:
   // *ngIf="mascota$ | async as mascota" */


}
