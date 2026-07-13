import { IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  receiverId: string;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  propertyId?: string;
}
