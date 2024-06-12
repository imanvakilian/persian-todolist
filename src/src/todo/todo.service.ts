import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { BadRequestMessage, ConflictMessage, forbiddenMessage, NotFoundMessage, PublicMessage } from 'src/common/messages/public.message';
import { permission } from 'process';

@Injectable({ scope: Scope.REQUEST })
export class TodoService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>,
  ) { }
  async create(createTodoDto: CreateTodoDto) {
    const { description, timeToDo, title } = createTodoDto;
    await this.checkExistByTitle(title);
    const createPermission = (await this.findAll()).length;
    if (createPermission > 15) throw new ForbiddenException(forbiddenMessage.maximumCreateTodo);
    const todolistId = this.req.todolistId;
    const todo = this.todoRepository.create({ description, timeToDo, title, todolistId });
    await this.todoRepository.save(todo);
    return {
      message: PublicMessage.created,
    }
  }

  async setAsDone(id: number) {
    const todo = await this.findOne(id);
    if (todo.isDone) throw new BadRequestException(BadRequestMessage.todoHasDone);
    todo.isDone = true;
    await this.todoRepository.save(todo);
    return {
      message: PublicMessage.ok,
    }
  }

  async findAll() {
    const todolistId = this.req.todolistId;
    const todos = await this.todoRepository.findBy({ todolistId });
    return todos;
  }

  async findOne(id: number) {
    const todolistId = this.req.todolistId;
    const todo = await this.todoRepository.findOneBy({ id, todolistId });
    if (!todo) throw new NotFoundException(NotFoundMessage.todo);
    return todo;
  }

  async checkExistByTitle(title: string) {
    const todolistId = this.req.todolistId;
    const todo = await this.todoRepository.findOneBy({ title, todolistId });
    if (todo) throw new ConflictException(ConflictMessage.todo);
    return null;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { timeToDo } = updateTodoDto;
    const todo = await this.findOne(id);
    todo.timeToDo = timeToDo;
    await this.todoRepository.save(todo);
    return {
      message: PublicMessage.todoUpdated,
    }
  }

  async remove(id: number) {
    const todolistId = this.req.todolistId;
    await this.todoRepository.delete({ id, todolistId });
    return {
      message: PublicMessage.todoDeleted,
    }
  }
}
