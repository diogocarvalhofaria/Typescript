import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoInput } from './dto/create-recado.dto';
import { UpdateRecado } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  // @Get('')
  // // findAll() {
  // //   return 'essa rota é para todos os recados';
  // // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.recadosService.findOne(id);
  }

  @Get(':id')
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    // return `essa rota é para um recado. Limit ${limit} e ${offset}`;
    return this.recadosService.findAll();
  }

  @Post()
  create(@Body() CreateRecado: CreateRecadoInput) {
    return this.recadosService.create(CreateRecado);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateRecado: UpdateRecado,
  ) {
    return this.recadosService.update(id, UpdateRecado);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
