import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AuthServiceInterface } from "./auth.service.interface";
import { TokenResponseModelOut } from "../dto/out/token.response.model.out";
import { UserServiceInterface } from "src/user/service/user.service.interface";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ExceptionMessage } from "src/common/exception/exception.messages";
import { SignUpUserModelIn } from "../dto/in/signup.user.model.in";
import { SignInUserModelIn } from "../dto/in/signin.user.model.in";
import { UserPersistenceInterface } from "src/user/persistence/user.persistence.interface";

@Injectable()
export class AuthService implements AuthServiceInterface {

    constructor (
        @Inject('UserPersistenceInterface')
        private readonly userPersistence: UserPersistenceInterface,
        private readonly jwtService: JwtService,
        @Inject('UserServiceInterface')
        private readonly userService: UserServiceInterface,
    ) {}
    public async signIn(signInUser: SignInUserModelIn): Promise<TokenResponseModelOut> {
        const {username, email, password} = signInUser;
        const user =
         (await this.userPersistence.getUserBy('email', email)) ?? (await this.userPersistence.getUserBy('username', username))
        if (!user) {
            throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }

        const hashedPassword = user.password;

        const match = await bcrypt.compare(password, hashedPassword);

        if(!match) {
            throw new BadRequestException(
                ExceptionMessage.AUTH.SIGNIN.PASSWORD_MISMATCH
            )
        }

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            city: user.city
        }
        let access_token: string;

        try {
            access_token = await this.jwtService.signAsync(payload);
        } catch {
            throw new InternalServerErrorException(ExceptionMessage.AUTH.JWT.SIGN);
        }

        return {
            access_token
        }
    }

    public async signUp(body: SignUpUserModelIn): Promise<TokenResponseModelOut> {
        const newUser = await this.userService.create(body);
        const payload = {
            sub: newUser.id,
            username: newUser.username,
            email: newUser.email,
            city: newUser.city
        }
        let access_token: string;

        try {
           access_token = await this.jwtService.signAsync(payload); 
        } catch (error) {
           throw new InternalServerErrorException(ExceptionMessage.AUTH.JWT.SIGN);
        }

        return {
            access_token
        }
    }
    
    public async generateToken(userId: string): Promise<string> {
        return this.jwtService.sign({ sub: userId }, { expiresIn: '30d' });
    }


}