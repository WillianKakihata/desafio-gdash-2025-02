import { SignInUserModelIn } from "../dto/in/signin.user.model.in";
import { SignUpUserModelIn } from "../dto/in/signup.user.model.in";
import { TokenResponseModelOut } from "../dto/out/token.response.model.out";

export interface AuthServiceInterface {
    signIn(field: SignInUserModelIn): Promise<TokenResponseModelOut>
    signUp(body: SignUpUserModelIn): Promise<TokenResponseModelOut>
}