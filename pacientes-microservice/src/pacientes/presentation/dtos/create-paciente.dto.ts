import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({ type: 'string', example: 'José Pereira' })
  nome: string;

  @ApiProperty({ type: 'string', example: '123.456.789-10' })
  cpf: string;

  @ApiProperty({ type: 'string', example: 'email@email.com' })
  email: string;

  @ApiProperty({ type: 'string', example: '1999-04-25' })
  dataNascimento: string;

  @ApiProperty({ type: 'string', example: '(99) 9 9999-9999' })
  telefone: string;

  @ApiProperty({ type: 'string', example: 'Rua...' })
  endereco: string;
}
