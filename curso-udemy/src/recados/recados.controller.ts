import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {
  }

  @Get('')
  // findAll() {
  //   return 'essa rota é para todos os recados';
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.recadosService.findOne(id);
  }

  @Get(':id')
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    // return `essa rota é para um recado. Limit ${limit} e ${offset}`;
    return this.recadosService.findAll();

  }

  @Post()
  create(@Body() body: any) {
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.recadosService.update(id, body);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
