import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendarVisitaService } from '../../../services/agendar-visita.service';

@Component({
  selector: 'app-agenda-visita', 
  templateUrl: './agenda-visita.component.html',
  styleUrls: ['./agenda-visita.component.css']
})
export class AgendaVisitaComponent { 
  form: FormGroup;

  constructor(private fb: FormBuilder, private agendarVisitaService: AgendarVisitaService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Formatear hora para agregar los segundos ":00" si no están presentes
      let hora = this.form.value.hora;
      if (/^\d{2}:\d{2}$/.test(hora)) {
        hora = hora + ':00';
      }
      const datos = {
        ...this.form.value,
        hora: hora
      };
      this.agendarVisitaService.agendarVisita(datos).subscribe({
        next: (res) => {
          alert('Visita agendada:\n' + JSON.stringify(datos, null, 2));
          this.form.reset();
        },
        error: (err) => {
          alert('Error al agendar visita');
        }
      });
    }
  }
}
