import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entites/recado';

@Module({
  imports: [TypeOrmModule.forFeature([Recado])],
  controllers: [RecadosController],
  providers: [RecadosService]
})
export class RecadosModule {}
