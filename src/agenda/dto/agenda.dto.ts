export class AgendaDto {
  id?: string;
  iCalUID : string;
  start: Date;
  end: Date;
  attendees: string
}

export class AgendaResponseDto{
  id: string;
}
