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
import { IPacienteService } from 'src/pacientes/domain/interfaces/paciente-service.interface';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { PacienteOutputDto } from '../dtos/paciente-output.dto';

@ApiTags('Pacientes')
@Controller('pacientes')
export class PacienteController {
  constructor(
    @Inject('IPacienteService')
    private readonly pacienteService: IPacienteService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Paciente cadastrado com sucesso.',
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreatePacienteDto })
  @ApiResponse({ type: PacienteOutputDto })
  async create(@Body() dto: CreatePacienteDto, @Res() res: Response) {
    const patient = await this.pacienteService.create(dto);
    return res.status(HttpStatus.CREATED).json(patient);
  }

  @Get('/cpf/:cpf')
  @ApiResponse({ type: PacienteOutputDto })
  async findByCpf(@Param('cpf') cpf: string, @Res() res: Response) {
    const patient = await this.pacienteService.findByCpf(cpf);
    return res.status(HttpStatus.OK).json(patient);
  }

  @Get(':id')
  @ApiResponse({ type: PacienteOutputDto })
  async findById(@Param('id') id: string, @Res() res: Response) {
    const patient = await this.pacienteService.findById(id);
    return res.status(HttpStatus.OK).json(patient);
  }

  @Get()
  @ApiResponse({ type: [PacienteOutputDto] })
  async getAll(@Res() res: Response) {
    const patient = await this.pacienteService.getAll();
    return res.status(HttpStatus.OK).json(patient);
  }
}
