import { IsIn, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateStatusDto {
  @IsInt()
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number; // 0=Pending/Rejected, 1=Approved
}
