import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicoDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: Date;
}
