export class Paciente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  endereco: string;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(medico: Partial<Paciente>) {
    this.nome = medico.nome;
    this.cpf = medico.cpf;
    this.email = medico.email;
    this.dataNascimento = medico.dataNascimento;
    this.telefone = medico.telefone;
    this.endereco = medico.endereco;
  }
}
