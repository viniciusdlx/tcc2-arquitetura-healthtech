export class Medico {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: Date;
  estadoCrm: string;
  crm: string;
  especialidade: string;
  telefone: string;
  horarios: HorariosMedico;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(medico: Partial<Medico>) {
    this.nome = medico.nome;
    this.cpf = medico.cpf;
    this.email = medico.email;
    this.dataNascimento = medico.dataNascimento;
    this.estadoCrm = medico.estadoCrm;
    this.crm = medico.crm;
    this.especialidade = medico.especialidade;
    this.telefone = medico.telefone;
    this.horarios = medico.horarios;
  }
}

export type HorariosMedico = {
  dom: string[] | [];
  seg: string[] | [];
  ter: string[] | [];
  qua: string[] | [];
  qui: string[] | [];
  sex: string[] | [];
  sab: string[] | [];
};
