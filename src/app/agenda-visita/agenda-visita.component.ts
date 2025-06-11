import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agenda-visita', 
  templateUrl: './agenda-visita.component.html',
  styleUrls: ['./agenda-visita.component.css']
})
export class AgendaVisitaComponent { 
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Visita agendada:\n' + JSON.stringify(this.form.value, null, 2));
      this.form.reset();
    }
  }
}
