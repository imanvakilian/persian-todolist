import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerApiConsumes, swaggerApiTags } from 'src/common/enums/swagger.enum';
import { AuthAndSetToDoListDecorator } from 'src/common/decorators/public.decorator';

@Controller('todo')
@ApiTags(swaggerApiTags.ToDo)
@AuthAndSetToDoListDecorator()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get(":id")
  setAsDone(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.setAsDone(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }
}
