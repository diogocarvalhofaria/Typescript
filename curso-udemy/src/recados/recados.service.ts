import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entites/recado';
import { CreateRecadoInput } from './dto/create-recado.dto';
import { UpdateRecado } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {
  }

  async findAll() {
    const recados = await this.recadosRepository.find({
      relations: ['de', 'para'],
    });
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

  async create(CreateRecado: CreateRecadoInput) {
    const {deId, paraId} = CreateRecado;
    //Encontrar a pessoa que está criando o recado
    const de = await this.pessoasService.findOne(deId);

    //Encontra a pessoa para quem o recado está sendo enviado
    const para = await this.pessoasService.findOne(paraId);

    const newRecado = {
      texto: CreateRecado.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadosRepository.create(newRecado);
    await this.recadosRepository.save(recado);
    return {
      ...recado,
      de:{
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      }
    };
  }

  async update(id: number, updateRecado: UpdateRecado) {
    const recado = await this.findOne(id);

    recado.texto = updateRecado?.texto ?? recado.texto;
    recado.lido = updateRecado?.lido ?? recado.lido;

    await this.recadosRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({
      id,
    });
    if (!recado) throw new NotFoundException(`Recado with id ${id} not found`);

    return this.recadosRepository.remove(recado);
  }

}
