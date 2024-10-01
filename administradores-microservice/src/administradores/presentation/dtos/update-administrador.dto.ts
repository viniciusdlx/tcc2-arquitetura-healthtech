import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdministradorDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: Date;
}
