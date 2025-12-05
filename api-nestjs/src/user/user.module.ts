import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { UserService } from './service/user.service';
import { UserPersistence } from './persistence/user.persistence';
import { AUTH_GUARD, AuthGuard } from 'src/common/guards/auth.guard';
import { UserController } from './controller/user.controller';
import { CustomConfigModule } from 'src/common/modules/custom.config.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    {
        provide: 'UserPersistenceInterface', useClass: UserPersistence
    },
    {
        provide: 'UserServiceInterface', useClass: UserService
    },
    {
      provide: AUTH_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    {
        provide: 'UserPersistenceInterface', useClass: UserPersistence
    },
    {
        provide: 'UserServiceInterface', useClass: UserService
    },
    {
      provide: AUTH_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
