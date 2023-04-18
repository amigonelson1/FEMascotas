import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/interfaces/mascota';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading: boolean = false;

  //para formularios crearemos la siguiente variable e importamos FormGroup;
  form: FormGroup;

  //luego debemos inicializarla en el constructor;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required], //Con los Validators podemos hacer validaciones de diferente indole;
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    })
  }

  agregarMascota() {
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

  }

}
