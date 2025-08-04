import { IsOptional } from "class-validator";

export class GetNonProfitDto {
    @IsOptional()
    ein?: number

    @IsOptional()
    organization_name?: string
}
