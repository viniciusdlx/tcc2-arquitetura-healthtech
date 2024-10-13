import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IAtendimentoService } from 'src/atendimentos/domain/interfaces/atendimento-service.interface';
import { AtendimentoOutputDto } from '../dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from '../dtos/create-atendimento.dto';

@ApiTags('Atendimentos')
@Controller('atendimentos')
export class AtendimentoController {
  constructor(
    @Inject('IAtendimentoService')
    private readonly atendimentoService: IAtendimentoService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Atendimento agendado com sucesso.',
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateAtendimentoDto })
  @ApiResponse({ type: AtendimentoOutputDto })
  async create(@Body() dto: CreateAtendimentoDto, @Res() res: Response) {
    const patient = await this.atendimentoService.create(dto);
    return res.status(HttpStatus.CREATED).json(patient);
  }

  @Get(':id')
  @ApiResponse({ type: AtendimentoOutputDto })
  async findById(@Param('id') id: string, @Res() res: Response) {
    const patient = await this.atendimentoService.findById(id);
    return res.status(HttpStatus.OK).json(patient);
  }

  @Get()
  @ApiResponse({ type: [AtendimentoOutputDto] })
  async getAll(@Res() res: Response) {
    const patient = await this.atendimentoService.getAll();
    return res.status(HttpStatus.OK).json(patient);
  }
}
