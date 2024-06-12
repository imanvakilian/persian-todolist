import { forwardRef, Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from './entities/todolist.entity';
import { OptionsModule } from '../options/options.module';
import { DrugModule } from '../drug/drug.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ToDoListEntity]),
    forwardRef(() => OptionsModule),
    forwardRef(() => DrugModule),
  ],
  controllers: [TodolistController],
  providers: [TodolistService],
  exports: [TodolistService, TypeOrmModule]
})
export class TodolistModule {
}
