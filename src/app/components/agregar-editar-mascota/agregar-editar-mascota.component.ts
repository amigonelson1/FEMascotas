import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading: boolean = false;

  //para formularios crearemos la siguiente variable e importamos FormGroup;
  form: FormGroup;
  id: number;
  operation: string = 'Agregar';

  //luego debemos inicializarla en el constructor;
  //para las peticiones http debemos injectar el servicio: 
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _mascotaService: MascotaService,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required], //Con los Validators podemos hacer validaciones de diferente indole;
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operation = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  agregarEditarMascota() {
    // los nombres de pueden extraer de las siguientes dos formas;
    /* const nombre = this.form.get('nombre')?.value; */
    /* const nombre = this.form.value.nombre; */

    //a continuacion guardamos el objeto;
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
    }

    if (this.id != 0) {
      mascota.id = this.id;
      this.editMascota(this.id, mascota);
    }
    else { this.addMascota(mascota) }
  }

  addMascota(mascota: Mascota) {
    this._mascotaService.addMascota(mascota).subscribe(data => {
      this._snackBar.open('Mascota registrada con exito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      })
      this.router.navigate(['/listMascotas']);
    });
  }

  editMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() => {
      this._snackBar.open('Mascota actualizada con exito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      })
      this.loading = false;
      this.router.navigate(['/listMascotas']);
    })
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        edad: data.edad,
        color: data.color,
        raza: data.raza,
        peso: data.peso
      })
      this.loading = false;
    })
  }

}
