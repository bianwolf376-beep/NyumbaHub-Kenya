import { IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  propertyId: string;

  @IsDateString()
  visitDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
