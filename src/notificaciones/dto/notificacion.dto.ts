export class AgendaDto {
  id_agenda: string;
  idPaciente: string;
  // idEspecialista: string;
  iCalUID: string;
  start: string;
  end: string;
  // correoEspecialista: string;
  correoPaciente: string;
}

export class AgendaResponseDto{
  id: string;
}


// Generated by https://quicktype.io

export class GoogleDataDto {
  summary:     string;
  location:    string;
  description: string;
  start:       End;
  end:         End;
  attendees:   Attendee[];
  reminders:   Reminders;
}

export class Attendee {
  email: string;
}

export class End {
  dateTime: string;
  timeZone: string;
}

export class Reminders {
  useDefault: boolean;
  overrides:  Override[];
}

export class Override {
  method:  string;
  minutes: number;
}



export interface GoogleDataResponseDto {
  attendees: Attendee[];
  created:   string;
  creator:   Creator;
  end:       End;
  etag:      string;
  eventType: string;
  htmlLink:  string;
  iCalUID:   string;
  id:        string;
  kind:      string;
  organizer: Creator;
  reminders: Reminders;
  sequence:  number;
  start:     End;
  status:    string;
  summary:   string;
  updated:   string;
}

export interface Attendee {
  email:          string;
  responseStatus: string;
}

export interface Creator {
  email: string;
  self:  boolean;
}

export interface End {
  dateTime: string;
  timeZone: string;
}

export interface Reminders {
  overrides:  Override[];
  useDefault: boolean;
}

export interface Override {
  method:  string;
  minutes: number;
}

// Generated by https://quicktype.io

export interface CitasDto {
  id_agenda:          string;
  idPaciente:         string;
  idEspecialista:     string;
  iCalUID:            string;
  start:              Date;
  end:                Date;
  correoEspecialista: string;
  correoPaciente:     string;
  id:                 string;
  name:               string;
  userType:           string;
  fathersLastName:    string;
  mothersLastName:    string;
  email:              string;
  sex:                string;
  birthDate:          Date;
  phoneNumber:        string;
}
