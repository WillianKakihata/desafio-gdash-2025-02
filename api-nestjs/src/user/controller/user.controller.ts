import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { UserServiceInterface } from "../service/user.service.interface";
import { CreateUserRequest } from "../request/create.user.request.dto";
import { UserResponseModelOut } from "../dto/out/response.user.model.out";
import { UserMapper } from "../dto/user.mapper";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UpdateUserRequest } from "../request/update.user.request.dto";

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface
  ) {}

  @Post()
  public async createUser(
    @Body() user: CreateUserRequest
  ): Promise<UserResponseModelOut> {
    const userModelIn = UserMapper.createUserRequestToUserModelIn(
      user
    );
    return this.userService.create(userModelIn);
  }

  @Get()
  public async getUsers(): Promise<UserResponseModelOut[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getSingleUserId(@Param('id') id: string): Promise<UserResponseModelOut> {
    return this.userService.getUserById(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req: { user: { sub: string } },
    @Body() newUser: UpdateUserRequest,
  ): Promise<UserResponseModelOut> {
    const { sub } = req.user;
    const userModelIn = UserMapper.updateUserRequestToModelIn(newUser);
    return this.userService.update(userModelIn, sub);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@Request() req: { user: { sub: string } }): Promise<void> {
    const { sub } = req.user;
    return this.userService.deleteUserById(sub);
  }

}
