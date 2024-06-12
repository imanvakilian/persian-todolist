import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateDrugDto } from './dto/drug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from './entities/drug.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BadRequestMessage, ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/messages/public.message';
import { DrugInctanceEntity } from './entities/drug-inctance.entity';
import { relationalDrugInctancesQuery } from 'src/common/utils/functions.util';

@Injectable({ scope: Scope.REQUEST })
export class DrugService {
  constructor(
    @InjectRepository(DrugEntity) private drugRepository: Repository<DrugEntity>,
    @InjectRepository(DrugInctanceEntity) private drugInctanceRepository: Repository<DrugInctanceEntity>,
    @Inject(REQUEST) private req: Request,
  ) { }

  async create(createDrugDto: CreateDrugDto) {
    const { name, description, length, time } = createDrugDto;
    await this.checkExistByName(name);
    const { id: userId } = this.req.user;
    const drug = this.drugRepository.create({ userId, name, description, length, time });
    await this.drugRepository.save(drug);
    return {
      message: PublicMessage.created,
    }
  }

  async setAsDone(id: number) {
    const drugInctance = await this.findOneInctance(id);
    if (drugInctance.done) throw new BadRequestException(BadRequestMessage.hasDone);
    drugInctance.done = true;
    await this.drugInctanceRepository.save(drugInctance);
    return {
      message: PublicMessage.ok,
    }

  }

  async findOneInctance(drugId: number) {
    const { today: date } = this.req;
    const { id: userId } = this.req.user;
    const drugInctance = await this.drugInctanceRepository.findOneBy({ drugId, date, userId });
    if (!drugInctance) throw new NotFoundException(NotFoundMessage.notFound);
    return drugInctance;
  }

  async checkExistByName(name: string) {
    const drug = await this.drugRepository.existsBy({ name });
    if (drug) throw new ConflictException(ConflictMessage.drug);
    return null;
  }

  // update(id: number, updateDrugDto: UpdateDrugDto) {
  //   return `This action updates a #${id} drug`;
  // }

  async remove(id: number) {
    await this.findOne(id);
    await this.drugRepository.delete({ id });
    return {
      message: PublicMessage.deleted,
    }
  }

  async findOne(id: number) {
    const drug = await this.drugRepository.findOneBy({ id });
    if (!drug) throw new NotFoundException(NotFoundMessage.notFound);
    return drug;
  }

  async autoSetDrug() {
    const { today: date } = this.req;
    const { id: userId } = this.req.user;
    const drugs = await this.drugRepository.findBy({ userId, active: true });
    let drugInectance;
    drugs.forEach(async drug => {
      drugInectance = await this.drugInctanceRepository.findOneBy({ userId, date, drugId: drug.id });
      if(!drugInectance) {
        drugInectance = this.drugInctanceRepository.create({ userId, drugId: drug.id, date });
        await this.drugInctanceRepository.save(drugInectance);
      }
    })
    return true
  }

  findAllWithRelations(date?: string) {
    if(date) return this.drugInctanceRepository.find(relationalDrugInctancesQuery("date", date));
    return this.drugInctanceRepository.find(relationalDrugInctancesQuery());
  }
}
