import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserResponseModelOut } from "./out/response.user.model.out";
import { UserDocument } from "../entities/user.schema";
import { ExceptionMessage } from "src/common/exception/exception.messages";
import { UpdateUserModelIn } from "./in/update.user.model.in";
import { UpdateUserRequest } from "../request/update.user.request.dto";
import { CreateUserRequest } from "../request/create.user.request.dto";
import { CreateUserModelIn } from "./in/create.user.model.in";

@Injectable()
export class UserMapper {
  public static createUserRequestToUserModelIn(
    request: CreateUserRequest,
  ): CreateUserModelIn {
    try {
      return new CreateUserModelIn(
        request.name,
        request.username,
        request.email,
        request.password,
        request.confirmPassword,
        request.city
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.SIGNUP_REQUEST_TO_MODEL_IN,
      );
    }
  }


  public static updateUserRequestToModelIn(
    request: UpdateUserRequest,
  ): UpdateUserModelIn {
    try {
      return new UpdateUserModelIn(
        request.name,
        request.username,
        request.email,
        request.city
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.UPDATE_REQUEST_TO_UPDATE_MODEL,
      );
    }
  }

  public static userDocumentToUserModelOut(
    document: UserDocument,
  ): UserResponseModelOut {
    try {
      return new UserResponseModelOut({
        id: document._id.toString(),
        name: document.name,
        username: document.username,
        email: document.email,
        city: document.city

      });
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.DOCUMENT_TO_MODEL_OUT,
      );
    }
  }

  public static arrayOfUserDocumentToUserModelOut(
    document: UserDocument[],
  ): UserResponseModelOut[] {
    try {
      if (!Array.isArray(document)) {
        throw new Error();
      }
      const userModelOutArray: UserResponseModelOut[] = [];
      document.forEach((document) => {
        userModelOutArray.push(
          new UserResponseModelOut({
            id: document._id.toString(),
            name: document.name,
            username: document.username,
            email: document.email,
            city: document.city
          }),
        );
      });
      return userModelOutArray;
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.ARRAY_DOCUMENTS_TO_MODEL_OUT,
      );
    }
  }


}