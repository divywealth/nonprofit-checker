import { PartialType } from '@nestjs/mapped-types';
import { GetNonProfitDto } from './create-nonprofit.dto';

export class UpdateNonprofitDto extends PartialType(GetNonProfitDto) {}
