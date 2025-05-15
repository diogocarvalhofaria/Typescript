import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  // Muito recados podem ser enviados por 1 pessoa
  @ManyToOne(() => Pessoa)
  // Especifica a coluna que armazena o ID da pessoa que enviou o recado
  @JoinColumn({name: 'de'})
  de: Pessoa;

  // Muitos recados podem ser enviado para um unica pessoa
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna 'de' que armazena o ID da pessoa que recebe o recado
  @JoinColumn({name: 'para'})
  para: Pessoa;

  @Column({ default: false })
  lido: boolean;

  @Column({ type: 'datetime' })
  data: Date;

}
