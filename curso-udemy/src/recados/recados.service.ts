import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entites/recado';
import { CreateRecado } from './dto/create-recado.dto';
import { UpdateRecado } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {

  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
  ) {
  }

  private lastId = 1;
  private recados: Recado[] = [];

  async findAll() {
    const recados = await this.recadosRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: { id },
    });

    if (!recado) {
      throw new NotFoundException(`Recado with id ${id} not found`);
    }
  }

  async create(CreateRecado: CreateRecado) {
    const newRecado = {
      ...CreateRecado,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadosRepository.save(newRecado);

    return this.recadosRepository.save(recado);

  }

  update(id: string, UpdateRecado: UpdateRecado) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === +id);
    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...UpdateRecado,
      };
    }
  }

  async remove(id: number) {
   const recado = await this.recadosRepository.findOneBy({
      id,
   });
   if(!recado)
     throw new NotFoundException(`Recado with id ${id} not found`);

    return this.recadosRepository.remove(recado);
  }

}