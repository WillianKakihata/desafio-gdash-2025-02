import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserRequest {
  @IsString({ message: 'First name must be a string' })
  @Matches(/^[A-Za-záéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ]+$/, {
    message:
      'First name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'name must be at least 5 characters long' })
  @IsOptional()
  name: string;


  @IsString({ message: 'User name must be a string' })
  @Matches(/^[A-Za-z0-9_]+$/, {
    message:
      'User name must contain only letters, numbers and underscores. Special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'User name must be at least 2 characters long' })
  @IsOptional()
  username: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  email: string;

}
