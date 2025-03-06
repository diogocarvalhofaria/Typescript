import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entites/recado.entity';

@Injectable()
export class RecadosService {

  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'recado teste',
      de: 'Ogo',
      para: 'Diogo',
      lido: false,
      data: new Date()
    },
  ];

  findAll(){
    return this.recados;
  }
  findOne(id: string){
    return this.recados.find(item => item.id === +id);
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...body,
    };
    this.recados.push(newRecado);

    return newRecado;
  }

  update(id: string, body: any) {
      const recadoExistenteIndex = this.recados.findIndex(item => item.id === +id);
      if (recadoExistenteIndex >= 0) {
        const recadoExistente = this.recados[recadoExistenteIndex];

        this.recados[recadoExistenteIndex] = {
          ...recadoExistente,
          ...body
        };
      }
  }

  remove(id: string){
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === +id);
    if (recadoExistenteIndex >= 0) {
      this.recados.splice(recadoExistenteIndex, 1);
    }

  }

}