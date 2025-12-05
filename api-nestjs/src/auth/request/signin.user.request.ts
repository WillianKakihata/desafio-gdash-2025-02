import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class SignInRequest {
    @IsOptional()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;
    
    @IsNotEmpty()
    password: string;
}