import { forwardRef, Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsEntity } from './entities/options.entity';
import { AuthModule } from '../auth/auth.module';
import { TodolistModule } from '../todolist/todolist.module';
import { OptionsInctanceEntity } from './entities/options-inctance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OptionsEntity, OptionsInctanceEntity]),
    AuthModule,
    forwardRef(() => TodolistModule)
  ],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService, TypeOrmModule]
})
export class OptionsModule { }
