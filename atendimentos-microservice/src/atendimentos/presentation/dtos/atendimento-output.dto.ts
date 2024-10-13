import { ApiProperty } from '@nestjs/swagger';
import {
  AtendimentoModalidadeEnum,
  AtendimentoStatusEnum,
} from 'src/atendimentos/domain/entities/atendimento.entity';

export class AtendimentoOutputDto {
  @ApiProperty({ example: 'f4837057-0181-4923-b40a-79e57f27861a' })
  id: string;

  @ApiProperty({ example: '01/01/2025' })
  data: string;

  @ApiProperty({ example: '14:30' })
  horario: string;

  @ApiProperty({ type: 'enum', enum: AtendimentoStatusEnum })
  status: AtendimentoStatusEnum;

  @ApiProperty({ type: 'enum', enum: AtendimentoModalidadeEnum })
  modalidade: AtendimentoModalidadeEnum;

  @ApiProperty({ type: 'string', example: 'Rua...' })
  local: string;

  @ApiProperty({ type: 'string', example: 'https://...' })
  url: string;

  @ApiProperty({
    type: 'string',
    example: 'c49774b2-0eba-42cc-9520-b890b4f70d25',
  })
  medicoId: string;

  @ApiProperty({
    type: 'string',
    example: '9812bf8d-2d29-4834-a007-e97d9894b86a',
  })
  pacienteId: string;

  @ApiProperty({
    type: 'string',
    example: '530cf1fe-de30-4c56-a1d4-3e90d256d87d',
  })
  adminId: string;

  @ApiProperty({ example: '10/10/2024 20:00:00' })
  dataCriacao: string;

  @ApiProperty({ example: '10/10/2024 20:00:00' })
  dataAtualizacao: string;
}
