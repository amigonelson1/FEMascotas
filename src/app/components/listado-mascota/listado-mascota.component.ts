import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';


const listMascotas: Mascota[] = [
  { nombre: 'Firulais', edad: 3, raza: 'Golden', color: 'Dorado', peso: 10 },
  { nombre: 'Luna', edad: 2, raza: 'Labrador', color: 'Negro', peso: 12 },
  { nombre: 'Max', edad: 5, raza: 'Bulldog', color: 'Marrón', peso: 15 },
  { nombre: 'Rocky', edad: 4, raza: 'Pitbull', color: 'Gris', peso: 20 },
  { nombre: 'Coco', edad: 1, raza: 'Chihuahua', color: 'Marrón claro', peso: 2 },
  { nombre: 'Buddy', edad: 7, raza: 'Beagle', color: 'Blanco y marrón', peso: 18 },
  { nombre: 'Lola', edad: 6, raza: 'Bichón Frisé', color: 'Blanco', peso: 8 },
  { nombre: 'Zeus', edad: 8, raza: 'Rottweiler', color: 'Negro y marrón', peso: 35 },
  { nombre: 'Sasha', edad: 2, raza: 'Husky Siberiano', color: 'Blanco y negro', peso: 25 },
  { nombre: 'Charlie', edad: 3, raza: 'Cocker Spaniel', color: 'Negro', peso: 11 },
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})


export class ListadoMascotaComponent implements AfterViewInit {

  displayedColumns: string[] = ['Nombre', 'Edad', 'Raza', 'Color', 'Peso', 'Acciones'];
  dataSource = new MatTableDataSource<Mascota>(listMascotas);;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarMascota() {
    this.loading= true;
    setTimeout(() => {
      this.loading= false;
      this._snackBar.open('Mascota eliminada de nuestro registro', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
    }, 3000)

  }
}
