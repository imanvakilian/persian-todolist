import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DrugService } from './drug.service';
import { CreateDrugDto } from './dto/drug.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerApiConsumes, swaggerApiTags } from 'src/common/enums/swagger.enum';
import { AuthAndSetDrugDecorator, AuthAndSetToDoListDecorator } from 'src/common/decorators/public.decorator';

@Controller('drug')
@ApiTags(swaggerApiTags.Drug)
@AuthAndSetDrugDecorator()
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Post()
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugService.create(createDrugDto);
  }

  @Get("/setAsDone/:id")
  setAsDone(@Param("id", ParseIntPipe) id: number) {
    return this.drugService.setAsDone(id);
  }

  @Delete(':id')
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.drugService.remove(id);
  }
}
