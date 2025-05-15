import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRecadoInput {

  @IsNotEmpty()
  @IsString()
  texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
