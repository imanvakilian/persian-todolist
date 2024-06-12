import {  Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from '../todolist/entities/todolist.entity';
import { AuthModule } from '../auth/auth.module';
import { TodolistModule } from '../todolist/todolist.module';
import { TodoEntity } from './entities/todo.entity';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule,
    TodolistModule,
    OptionsModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
}
