import { Module } from '@nestjs/common';
import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugEntity } from './entities/drug.entity';
import { DrugInctanceEntity } from './entities/drug-inctance.entity';
import { AuthModule } from '../auth/auth.module';
import { TodolistModule } from '../todolist/todolist.module';
import { TodoModule } from '../todo/todo.module';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DrugEntity, DrugInctanceEntity]),
    AuthModule,
    TodolistModule,
    TodoModule,
    OptionsModule,
  ],
  controllers: [DrugController],
  providers: [DrugService],
  exports: [DrugService],
})
export class DrugModule { }
