import { ApiProperty } from '@nestjs/swagger';

export class PacienteOutputDto {
  @ApiProperty({ example: 'f4837057-0181-4923-b40a-79e57f27861a' })
  id: string;

  @ApiProperty({ example: 'João' })
  nome: string;

  @ApiProperty({ example: '12345678910' })
  cpf: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: '10/10/1990' })
  dataNascimento: string;

  @ApiProperty({ example: '99999999999' })
  telefone: string;

  @ApiProperty({ type: 'string', example: 'Rua...' })
  endereco: string;

  @ApiProperty({ example: '10/10/1990 20:00:00' })
  dataCriacao: string;

  @ApiProperty({ example: '10/10/1990 20:00:00' })
  dataAtualizacao: string;
}
