import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ExceptionMessage } from "src/common/exception/exception.messages";
import { SignInRequest } from "../request/signin.user.request";
import { SignInUserModelIn } from "./in/signin.user.model.in";

@Injectable()
export class AuthMapper {
    public static signInRequestToSignInModelIn(
        request: SignInRequest,
    ): SignInUserModelIn {
    try {
      return new SignInUserModelIn(
        request.username ?? '',
        request.email,
        request.password,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.SIGNUP_REQUEST_TO_MODEL_IN,
      );
    }
  }

}