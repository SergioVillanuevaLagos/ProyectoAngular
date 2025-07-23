export interface Reporte {
  // id: number;
  // locacionId: number;
  // tipo: 'Contenido inapropiado' | 'Fraude' | 'Otro';
  // estado: 'Pendiente' | 'Advertencia enviada' | 'Suspendido' | 'Resuelto';
  // descripcion: string;
  // fecha: string;
  // usuario: string;

  IDUsuarioReportante: number;
  IDPropiedadReportado: number;
  IDDueñoReportado: number;
  Detalle: string;
  Estado: 'Pendiente' | 'Advertencia enviada' | 'Suspendido' | 'Resuelto';
  FechaReporte: string;
}
