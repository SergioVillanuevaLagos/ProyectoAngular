import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Locacion } from '../../../models/locacion.model';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() locacion?: Locacion;
  reportType = '';
  reportReason = '';
  startDate = '';

  @Output() close = new EventEmitter<void>();
  @Output() generate = new EventEmitter<{
    type: string;
    reason: string;
    start: string;
    locacionId?: number;
  }>();

  onGenerate() {
    if (this.isFormValid()) {
      this.generate.emit({
        type: this.reportType,
        reason: this.reportReason,
        start: this.startDate,
        locacionId: this.locacion?.IDLocacion
      });

      this.close.emit();
    }
  }

  isFormValid(): boolean {
    return !!this.reportType &&
           !!this.reportReason &&
           !!this.startDate
  }
}
