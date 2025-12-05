 import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Request } from "@nestjs/common"
import { AuthServiceInterface } from "../service/auth.service.interface";
import { SignInRequest } from "../request/signin.user.request";
import { TokenResponseModelOut } from "../dto/out/token.response.model.out";
import { UserMapper } from "src/user/dto/user.mapper";
import { AuthMapper } from "../dto/auth.mapper";
import { SignUpRequest } from "../request/signup.user.request";
import { IsPublic } from "src/common/decorators/is.public";
 @Controller('auth')
 export class AuthController {
   constructor(
        @Inject('AuthServiceInterface')
        private readonly userService: AuthServiceInterface
   ) {}
   
   @IsPublic()
   @Post('/signin')
   public async signin(
    @Body() user: SignInRequest
   ): Promise<TokenResponseModelOut> {
    const signInModel = AuthMapper.signInRequestToSignInModelIn(user)
    return this.userService.signIn(signInModel);
   }

   @IsPublic()
   @Post('/signup')
   public async signup(
    @Body() user: SignUpRequest
   ): Promise<TokenResponseModelOut> {
    const signUpModel = UserMapper.createUserRequestToUserModelIn(user)
    return this.userService.signUp(signUpModel);
   }
 
   
 
 }
 