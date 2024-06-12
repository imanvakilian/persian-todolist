import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { initTypeOrm } from 'src/config/typeorm.config';
import { AuthModule } from 'src/src/auth/auth.module';
import { DrugModule } from 'src/src/drug/drug.module';
import { OptionsModule } from 'src/src/options/options.module';
import { TodoModule } from 'src/src/todo/todo.module';
import { TodolistModule } from 'src/src/todolist/todolist.module';
import { UserModule } from 'src/src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
    AuthModule,
    TodolistModule,
    TodoModule,
    OptionsModule,
    DrugModule,
    UserModule,
    TypeOrmModule.forRoot(initTypeOrm())
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
