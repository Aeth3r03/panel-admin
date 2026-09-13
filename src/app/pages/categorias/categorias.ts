import { Component, computed, OnInit, signal } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../core/services/categoria/categoria.service';
import { NotificacionService } from '../../core/services/notificacion/notificacion.service';
import { CategoryCard } from '../../shared/category-card/category-card';
import { Header } from '../../shared/header/header';
import { environment } from '../../../environments/environment';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CategoryCard, Header],
  selector: 'app-categorias',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categorias implements OnInit {
  categorias = signal<Categoria[]>([])
  devMode = false
  cargando = signal(true)
  nombre = new FormControl('')
  editandoId = signal<number | null>(null)
  categoriaEditando = signal<Categoria | null>(null)
  dialogoAbierto = signal(false);
  dialogoEliminarAbierto = signal(false);
  categoriaEliminar = signal<Categoria | null>(null);
  modoEdicion = signal(false);
  placeholder = '/imagenes/categoria-placeholder.jpg'

  constructor(
    private categoriaService: CategoriaService,
    public notificacionService: NotificacionService,
  ) {}

  cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias.set(data)
        this.cargando.set(false)
      },
      error: (err) => {
        if (err?.status === 401) {
          return;
        }
        if (this.devMode) {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar(`Error: ${err}`)
        } else {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar("Error al cargar las categorias.")
        }
        this.cargando.set(false)
      }
    })
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  crear() {
    const nombre = this.nombre.value?.trim();
    if (!nombre) return;

    this.categoriaService.crearCategoria(nombre).subscribe({
      next: (categoria) => {
        this.cargarCategorias();
        this.nombre.reset();
        this.cerrarDialogo();
      },
      error: (err) => {
        if (err?.status == 401) {
          return;
        }
        if (this.devMode) {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar(`Error: ${err}`)
        } else {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar("No se pudo crear la categoría.")
        }
      }
    })
  }

  actualizar(id: number) {
    const nombre = this.nombre.value?.trim();
    if (!nombre) return;
    this.categoriaService.actualizarCategoria(id, nombre).subscribe({
      next: () => {
        this.editandoId.set(null);
        this.nombre.reset();
        this.cargarCategorias();
        this.cerrarDialogo();
      },
      error: (err) => {
        if (err?.status === 401) {
          return;
        }

        if (this.devMode) {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar(`Error: ${err}`)
        } else {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar("No se pudo actualizar la categoría")
        }
      }
    })
  }

  eliminar(id: number) {
    this.categoriaService.eliminarCategoria(id).subscribe({
      next: () => {
        this.cargarCategorias();
        this.categoriaEliminar.set(null);
        this.dialogoEliminarAbierto.set(false);
      },
      error: (err) => {
        const detalle = err?.error?.detail;
        if (err?.status === 401) {
          return;
        }

        if (this.devMode) {
          this.notificacionService.limpiar();
          this.notificacionService.mostrar(`Error: ${err}`)
        } else {
          if (err?.status === 400){
            this.notificacionService.limpiar();
            this.notificacionService.mostrar(detalle || "No se puede eliminar")
          } else {
            this.notificacionService.limpiar();
            this.notificacionService.mostrar("No se pudo eliminar la categoría")
          }
        }
      }
    })
  }

  urlImagenModal = computed(() => {
    const img = this.categoriaEditando()?.imagen_url;
    if (!img) return this.placeholder;
    return environment.backendUrl + img;
  });

  guardar() {
    const id = this.editandoId();
    if (id === null) {
      this.crear()
    } else {
      this.actualizar(id)
    }
  }

  abrirCrear() {
    this.modoEdicion.set(false);
    this.editandoId.set(null);
    this.nombre.reset();
    this.notificacionService.limpiar();
    this.dialogoAbierto.set(true);
  }

  abrirEditar(categoria: Categoria) {
    this.modoEdicion.set(true);
    this.editandoId.set(categoria.id);
    this.nombre.setValue(categoria.nombre);
    this.notificacionService.limpiar();
    this.categoriaEditando.set(categoria)
    this.dialogoAbierto.set(true);
  }

  confirmarEliminar(categoria: Categoria) {
    this.categoriaEliminar.set(categoria);
    this.notificacionService.limpiar();
    this.dialogoEliminarAbierto.set(true);
  }

  cerrarDialogoEliminar() {
    this.categoriaEliminar.set(null);
    this.dialogoEliminarAbierto.set(false);
  }

  cerrarDialogo() {
    this.dialogoAbierto.set(false);
    this.nombre.reset();
    this.editandoId.set(null)
  }
}
