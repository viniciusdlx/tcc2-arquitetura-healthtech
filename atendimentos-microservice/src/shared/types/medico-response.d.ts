export type MedicoResponse = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  estadoCrm: string;
  crm: string;
  telefone: string;
  horarios: Schedule;
  dataCriacao: string;
  dataAtualizacao: string;
};

export type Schedule = {
  dom: string[];
  seg: string[];
  ter: string[];
  qua: string[];
  qui: string[];
  sex: string[];
  sab: string[];
};
