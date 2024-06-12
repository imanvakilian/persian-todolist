import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoListEntity } from './entities/todolist.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as jalaliMoment from 'jalali-moment';
import { relationalToDoListQuery } from 'src/common/utils/functions.util';
import { OptionsService } from '../options/options.service';
import { DrugService } from '../drug/drug.service';

@Injectable({ scope: Scope.REQUEST })
export class TodolistService {
    constructor(
        @InjectRepository(ToDoListEntity) private todolistRepository: Repository<ToDoListEntity>,
        @Inject(REQUEST) private req: Request,
        private optionsService: OptionsService,
        private drugService: DrugService,
    ) { }
    async today() {
        return {
            todolist: await this.findOneWithRelation(this.req.todolistId),
            options: await this.optionsService.findAllOptionsWithRelations(this.req.today),
            drug: await this.drugService.findAllWithRelations(this.req.today),
        } 
    };
    async recently() {
        return {
            todolists: await this.todolistRepository.find(relationalToDoListQuery()),
            options: await this.optionsService.findAllOptionsWithRelations(),
            drug: await this.drugService.findAllWithRelations(),
        } 
    }
    create(date: string) {
        const { id: userId } = this.req.user;
        const todolist = this.todolistRepository.create({ userId, date });
        return this.todolistRepository.save(todolist);
    }
    findOneWithRelation(id: number) {
        return this.todolistRepository.findOne(relationalToDoListQuery("id", id));
    }
    async findOneByDateResolver(date: string, userId: number) {
        let todolist = await this.todolistRepository.findOneBy({ date, userId });
        if (todolist) return todolist;
        todolist = await this.create(date);
        const checkCreatePermission = (await this.todolistRepository.findBy({ userId })).length;
        if (checkCreatePermission >= 8) await this.todolistRepository.delete({ userId, id: (todolist.id - 7) });
        return todolist;
    }
}
