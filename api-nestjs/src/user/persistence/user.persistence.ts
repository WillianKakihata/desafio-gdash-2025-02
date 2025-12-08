import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserPersistenceInterface } from "./user.persistence.interface";
import { CreateUserModelIn } from "../dto/in/create.user.model.in";
import { User, UserDocument } from "../entities/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExceptionMessage } from "src/common/exception/exception.messages";

@Injectable()
export class UserPersistence implements UserPersistenceInterface {
    constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
    public async saveUser(user: CreateUserModelIn): Promise<UserDocument> {
    try {
      return this.userModel.create(user);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.CREATE);
    }
  }

  public async getAllUsers(): Promise<UserDocument[]> {
    try {
      return this.userModel.find({});
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.GET_ALL);
    }
  }

  public async getUserBy(
    field: string,
    value: string,
  ): Promise<UserDocument | null> {
    try {
      return this.userModel.findOne({ [field]: value });
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.GET_BY('email'),
      );
    }
  }

  public async getUserById(id: string): Promise<UserDocument | null> {
    try {
      return this.userModel.findById(id);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.GET_ID);
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.DELETE_ID);
    }
  }
}
