import { ApiProperty } from '@nestjs/swagger';

export class UpdatePacienteDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: Date;
}
