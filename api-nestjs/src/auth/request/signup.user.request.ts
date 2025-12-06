import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignUpRequest {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
    
    @IsNotEmpty()
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
    )
    password: string;

    @IsNotEmpty()
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