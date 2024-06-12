import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OptionsService } from './options.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerApiConsumes, swaggerApiTags } from 'src/common/enums/swagger.enum';
import { AuthAndOptionsDecorator, AuthAndSetToDoListDecorator } from 'src/common/decorators/public.decorator';
import { CreateOptionDto } from './dto/options.dto';

@Controller('options')
@ApiTags(swaggerApiTags.Options)
@AuthAndOptionsDecorator()
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get("/activate/:optionId")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  activeOptionsToggle(@Param("optionId", ParseIntPipe) optionId: number) {
    return this.optionsService.activeOptionsToggle(optionId)
  }

  @Post("/create")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto)
  }

  @Post("/increase-to-done/:optionId")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  increaseToDone(@Param("optionId", ParseIntPipe) optionId: number) {
    return this.optionsService.increaseToDone(optionId)
  }

  @Delete("/delete/:optionId")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  delete(@Param("optionId", ParseIntPipe) optionId: number) {
    return this.optionsService.delete(optionId)
  }

}
