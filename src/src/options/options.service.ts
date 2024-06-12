import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionsEntity } from './entities/options.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/messages/public.message';
import { CreateOptionDto } from './dto/options.dto';
import * as jalaliMoment from "jalali-moment";
import { OptionsInctanceEntity } from './entities/options-inctance.entity';
import { TodolistService } from '../todolist/todolist.service';
import { relationalOptionInctancesQuery } from 'src/common/utils/functions.util';

@Injectable({ scope: Scope.REQUEST })
export class OptionsService {
    constructor(
        @InjectRepository(OptionsEntity) private optionsRepository: Repository<OptionsEntity>,
        @InjectRepository(OptionsInctanceEntity) private optionInctancesRepository: Repository<OptionsInctanceEntity>,
        @Inject(REQUEST) private req: Request,
    ) { }

    async create(createOptionDto: CreateOptionDto) {
        const { description, limitation = 1, title } = createOptionDto;
        await this.checkExistByTitle(title);
        const { id: userId } = this.req.user;
        const option = this.optionsRepository.create({ userId, title, description, limitation: +limitation });
        await this.optionsRepository.save(option);
        return {
            message: PublicMessage.created
        }
    }

    async activeOptionsToggle(optionId: number) {
        const option = await this.findOne(optionId);
        let message = PublicMessage.active;
        if (option.active) {
            message = PublicMessage.diActive;
            option.active = false;
        } else option.active = true;
        await this.optionsRepository.save(option);
        return {
            message,
        }
    }

    async increaseToDone(optionId: number) {
        const checkOptionInctance = await this.findOneInctance(optionId);
        const optionInctance = await this.optionInctancesRepository.findOne(relationalOptionInctancesQuery("optionId", checkOptionInctance.id));
        const limitation = optionInctance.option.limitation;
        if (optionInctance.how_many_done < limitation) {
            optionInctance.how_many_done += 1;
            if (optionInctance.how_many_done == limitation) optionInctance.done = true;
            await this.optionInctancesRepository.save(optionInctance);
            return {
                message: PublicMessage.ok,
                optionInctance
            }
        }
        throw new BadRequestException(PublicMessage.error);

    }

    async delete(optionId: number) {
        await this.findOne(optionId);
        await this.optionsRepository.delete({ id: optionId });
        return {
            message: PublicMessage.deleted,
        }

    }

    async findOne(id: number) {
        const { id: userId } = this.req.user;
        const option = await this.optionsRepository.findOneBy({ userId, id });
        if (!option) throw new NotFoundException(NotFoundMessage.notFound);
        return option;
    }

    async findOneInctance(optionId: number) {
        const { id: userId } = this.req.user;
        const { today: date } = this.req;
        const option = await this.optionInctancesRepository.findOneBy({ userId, optionId, date });
        if (!option) throw new NotFoundException(NotFoundMessage.notFound);
        return option;
    }


    async checkExistByTitle(title: string) {
        const { id: userId } = this.req.user;
        const option = await this.optionsRepository.findOneBy({ userId, title });
        if (option) throw new ConflictException(ConflictMessage.conflict);
        return null;
    }

    async autoSetOptions() {
        const { today: date } = this.req;
        const { id: userId } = this.req.user;
        // const optionInctance = await this.optionInctancesRepository.findOneBy({userId, })
        const options = await this.optionsRepository.findBy({ userId, active: true });
        let optionInctance;
        options.forEach(async option => {
            optionInctance = await this.optionInctancesRepository.findOneBy({ userId, optionId: option.id, date });
            if (!optionInctance) {
                optionInctance = this.optionInctancesRepository.create({ userId, optionId: option.id, date });
                await this.optionInctancesRepository.save(optionInctance);
            };

        })
        return true;
    }

    findAllOptionsWithRelations(date?: string) {
        if(date) return this.optionInctancesRepository.find(relationalOptionInctancesQuery("date", date));
        return this.optionInctancesRepository.find(relationalOptionInctancesQuery())
    }

}
