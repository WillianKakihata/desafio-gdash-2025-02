import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserModelIn } from "../dto/in/create.user.model.in";
import { UpdateUserModelIn } from "../dto/in/update.user.model.in";
import { UserResponseModelOut } from "../dto/out/response.user.model.out";
import { UserServiceInterface } from "./user.service.interface";
import { availableFields, UserPersistenceInterface } from "../persistence/user.persistence.interface";
import { ExceptionMessage } from "src/common/exception/exception.messages";
import { UserMapper } from "../dto/user.mapper";
import * as bcrypt from 'bcryptjs';
import { CustomConfigService } from "src/common/modules/custom.config.service";

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject('UserPersistenceInterface')
        private readonly UserPersistence: UserPersistenceInterface,
        private readonly config: CustomConfigService
    ) {}
    public async create(NewUser: CreateUserModelIn): Promise<UserResponseModelOut> {
      if (NewUser.password !== NewUser.confirmPassword) {
        throw new BadRequestException(
            ExceptionMessage.AUTH.SIGNUP.PASSWORD_MISMATCH,
        );
      }

      const [emailExist, usernameExist] = await Promise.all([
        this.UserPersistence.getUserBy('email', NewUser.email),
        this.UserPersistence.getUserBy('username', NewUser.username),
      ]);

      if(emailExist) {
        throw new BadRequestException(ExceptionMessage.AUTH.SIGNUP.EMAIL_TAKEN);
      }

      if(usernameExist) {
        throw new BadRequestException(ExceptionMessage.AUTH.SIGNUP.USERNAME_TAKEN);
      }
  
      const salt = await bcrypt.genSalt(
        Number(this.config.get<string>('BCRYPT_ROUNDS')),
      );
  
      try {
        NewUser.password = await bcrypt.hash(NewUser.password, salt);
      } catch {
        throw new InternalServerErrorException(ExceptionMessage.BCRYPT.PASS_HASH);
      }

      const userDocument = await this.UserPersistence.saveUser(NewUser);
      return UserMapper.userDocumentToUserModelOut(userDocument);
  
    }

    public async update(updateModelIn: UpdateUserModelIn, userId: string): Promise<UserResponseModelOut> {
        const usernameAlreadyExists = await this.UserPersistence.getUserBy(
        'username',
        updateModelIn.username ?? '',
        );

        const emailAlreadyExists = await this.UserPersistence.getUserBy(
        'email',
        updateModelIn.email ?? '',
        );

        if (usernameAlreadyExists && usernameAlreadyExists._id.toString() != userId) {
            throw new BadRequestException(
                ExceptionMessage.AUTH.SIGNUP.USERNAME_TAKEN,
            );
        }

        if (emailAlreadyExists && emailAlreadyExists._id.toString() != userId) {
            throw new BadRequestException(
                ExceptionMessage.AUTH.SIGNUP.EMAIL_TAKEN,
            );
        }

        const oldUser = await this.UserPersistence.getUserById(userId);

        if (!oldUser) {
            throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }
        try {
            oldUser.name = updateModelIn.name ?? oldUser.name;
            oldUser.username = updateModelIn.username ?? oldUser.username;
            oldUser.email = updateModelIn.email ?? oldUser.email;
        } catch {
            throw new BadRequestException(
                ExceptionMessage.USERS.UPDATE_INVALID_PAYLOAD,
            );
        }

        await oldUser.save();

        return UserMapper.userDocumentToUserModelOut(oldUser);
    }

    public async getUserBy(field: availableFields, value: string): Promise<UserResponseModelOut> {
        const user = await this.UserPersistence.getUserBy(field, value);
        if (!user) {
            throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }

        return UserMapper.userDocumentToUserModelOut(user);
    }

    public async getUserById(id: string): Promise<UserResponseModelOut> {
        const user = await this.UserPersistence.getUserById(id);
        if (!user) {
            throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }

        return UserMapper.userDocumentToUserModelOut(user);
    }

    public async getAllUsers(): Promise<UserResponseModelOut[]> {
        const users = await this.UserPersistence.getAllUsers();
        if (users.length === 0) {
            throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }
     return UserMapper.arrayOfUserDocumentToUserModelOut(users);
    }
    
    public async deleteUserById(id: string): Promise<void> {
        await this.UserPersistence.deleteUserById(id);
    }

}