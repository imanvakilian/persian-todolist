import { Controller, Get } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { ApiTags } from '@nestjs/swagger';
import { swaggerApiTags } from 'src/common/enums/swagger.enum';
import { AuthAndSetToDoListDecorator, AuthDecorator } from 'src/common/decorators/public.decorator';

@Controller('todolist')
@ApiTags(swaggerApiTags.ToDoList)
@AuthAndSetToDoListDecorator()
// @AuthDecorator()
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}
    @Get()
    today() {
        return this.todolistService.today();
    }
    @Get("/recently")
    recently() {
        return this.todolistService.recently();
    }
}
