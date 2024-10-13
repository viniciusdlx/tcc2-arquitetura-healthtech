import { ApiProperty } from '@nestjs/swagger';

export class UpdateAtendimentoDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: Date;
}
