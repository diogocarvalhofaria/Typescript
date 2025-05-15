import { IsBoolean, IsBooleanString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoInput } from './create-recado.dto';

export class UpdateRecado extends PartialType(CreateRecadoInput) {
  @IsBooleanString()
  @IsOptional()
  readonly lido?: boolean;
}
