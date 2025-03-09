import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecado {

  @IsNotEmpty()
  @IsString()
  readonly texto: string;

  @IsNotEmpty()
  @IsString()
  readonly de: string;

  @IsNotEmpty()
  @IsString()
  readonly para: string;

}
