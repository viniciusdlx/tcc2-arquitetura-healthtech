import { ApiProperty } from '@nestjs/swagger';

export class MedicoOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: string;

  @ApiProperty()
  dataCriacao: string;

  @ApiProperty()
  dataAtualizacao: string;
}
