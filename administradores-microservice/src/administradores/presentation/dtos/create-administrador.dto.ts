import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministradorDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: Date;
}
