import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IAtendimentoService } from 'src/atendimentos/domain/interfaces/atendimento-service.interface';
import { AtendimentoOutputDto } from '../dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from '../dtos/create-atendimento.dto';
import { QueryAtendimentoDto } from '../dtos/query-atendimento.dto';

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
  @ApiQuery({
    type: QueryAtendimentoDto,
  })
  async getAll(@Query() query: QueryAtendimentoDto, @Res() res: Response) {
    const patient = await this.atendimentoService.getAll(query);
    return res.status(HttpStatus.OK).json(patient);
  }
}
