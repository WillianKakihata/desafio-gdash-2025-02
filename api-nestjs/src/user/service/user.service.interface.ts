import type { CreateUserModelIn } from "../dto/in/create.user.model.in";
import type { UpdateUserModelIn } from "../dto/in/update.user.model.in";
import type { UserResponseModelOut } from "../dto/out/response.user.model.out";

export interface UserServiceInterface {
  create(userModelIn: CreateUserModelIn): Promise<UserResponseModelOut>;
  update(updateModelIn: UpdateUserModelIn, userId: string): Promise<UserResponseModelOut>;
  getUserBy(field: string, value: string): Promise<UserResponseModelOut>;
  getUserById(id: string): Promise<UserResponseModelOut>;
  getAllUsers(): Promise<UserResponseModelOut[]>
  deleteUserById(id: string): Promise<void>;
}
