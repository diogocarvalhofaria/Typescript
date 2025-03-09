import { IsBoolean, IsBooleanString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecado } from './create-recado.dto';

export class UpdateRecado extends PartialType(CreateRecado){

  @IsBooleanString()
  @IsOptional()
  readonly lido?: boolean;

}