import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString({ message: 'First name must be a string' })
  @Matches(/^[A-Za-záéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ]+$/, {
    message:
      'First name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'name must be at least 5 characters long' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'User name must be a string' })
  @Matches(/^[A-Za-z0-9_]+$/, {
    message:
      'User name must contain only letters, numbers and underscores. Special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'User name must be at least 2 characters long' })
  username: string;

  @IsNotEmpty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  confirmPassword: string

  @IsNotEmpty()
  @IsString()
  city: string
}
