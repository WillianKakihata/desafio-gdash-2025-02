import type { CreateUserModelIn } from "../dto/in/create.user.model.in";
import type { UserDocument } from "../entities/user.schema";

export type availableFields = '_id' | 'username' | 'email';

export interface UserPersistenceInterface {
  saveUser(user: CreateUserModelIn): Promise<UserDocument>;
  getAllUsers(): Promise<UserDocument[]>;
  getUserBy(key: availableFields, value: string): Promise<UserDocument | null>;
  getUserById(id: string): Promise<UserDocument | null>;
  deleteUserById(id: string): Promise<void>;
}