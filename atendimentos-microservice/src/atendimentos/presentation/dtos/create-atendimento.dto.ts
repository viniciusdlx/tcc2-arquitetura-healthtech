import { ApiProperty } from '@nestjs/swagger';
import { AtendimentoModalidadeEnum } from 'src/atendimentos/domain/entities/atendimento.entity';

export class CreateAtendimentoDto {
  @ApiProperty({ type: 'string', example: '2024-10-13' })
  data: string;

  @ApiProperty({ type: 'string', example: '14:00' })
  horario: string;

  @ApiProperty({ type: 'enum', enum: AtendimentoModalidadeEnum })
  modalidade: AtendimentoModalidadeEnum;

  @ApiProperty({ type: 'string', example: 'Rua...' })
  local: string;

  @ApiProperty({
    type: 'uuid',
    example: '03d0d042-2338-421c-b063-d5d9ff9bd11c',
  })
  medicoId: string;

  @ApiProperty({
    type: 'uuid',
    example: '8095465f-96e8-468a-9919-0cbc9a9b75cf',
  })
  pacienteId: string;

  @ApiProperty({
    type: 'uuid',
    example: 'd43a6ede-f74e-4d83-a495-5197e44344c4',
  })
  adminId: string;
}
