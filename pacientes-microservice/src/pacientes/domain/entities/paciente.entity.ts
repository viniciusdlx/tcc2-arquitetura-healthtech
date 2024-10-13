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

  constructor(data: Partial<Paciente>) {
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.dataNascimento = data.dataNascimento;
    this.telefone = data.telefone;
    this.endereco = data.endereco;
  }
}
