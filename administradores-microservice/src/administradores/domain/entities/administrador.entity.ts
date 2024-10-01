export class Administrador {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(admin: Partial<Administrador>) {
    this.nome = admin.nome;
    this.cpf = admin.cpf;
    this.email = admin.email;
    this.telefone = admin.telefone;
    this.dataNascimento = admin.dataNascimento;
  }
}
