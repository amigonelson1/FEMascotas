import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';


@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})


export class ListadoMascotaComponent implements AfterViewInit {

  displayedColumns: string[] = ['Nombre', 'Edad', 'Raza', 'Color', 'Peso', 'Acciones'];
  dataSource = new MatTableDataSource<Mascota>();;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) this.paginator._intl.itemsPerPageLabel = "Items por página";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    },error =>{
      this.loading= false,
      alert('Opps!!!, al parecer algo no anda bien')
    } )
  } */

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (e) => {
        this.loading = false,
          alert('Opps!!!, al parecer algo no anda bien')
      },
      complete: () => { }
    })
  }

  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(() => {
      this._snackBar.open('Mascota eliminada de nuestro registro', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.obtenerMascotas();
    })


  }
}
