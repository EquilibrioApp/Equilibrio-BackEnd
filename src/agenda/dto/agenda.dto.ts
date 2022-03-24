export class AgendaDto {
  id?: string;
  pacienteId: string;
  especialistaId: string;
  iCalUID : string;
  start: Date;
  end: Date;
  attendees: string
}

export class AgendaResponseDto{
  id: string;
}
