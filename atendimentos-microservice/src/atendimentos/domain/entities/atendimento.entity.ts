export class Atendimento {
  id: string;
  data: string;
  horario: string;
  status: AtendimentoStatusEnum;
  modalidade: AtendimentoModalidadeEnum;
  local: string;
  url: string;
  medicoId: string;
  pacienteId: string;
  adminId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(paciente: Partial<Atendimento>) {
    this.data = paciente.data;
    this.horario = paciente.horario;
    this.status = paciente.status;
    this.modalidade = paciente.modalidade;
    this.local = paciente.local;
    this.url = paciente.url;
    this.medicoId = paciente.medicoId;
    this.pacienteId = paciente.pacienteId;
    this.adminId = paciente.adminId;
  }
}

export enum AtendimentoModalidadeEnum {
  PRESENCIAL = 'PRESENCIAL',
  TELEMEDICINA = 'TELEMEDICINA',
}

export enum AtendimentoStatusEnum {
  AGENDADA = 'AGENDADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUÍDA',
  CANCELADA = 'CANCELADA',
}
