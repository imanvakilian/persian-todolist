import { randomInt } from "crypto";
import { DrugInctanceEntity } from "src/src/drug/entities/drug-inctance.entity";
import { OptionsInctanceEntity } from "src/src/options/entities/options-inctance.entity";
import { ToDoListEntity } from "src/src/todolist/entities/todolist.entity";
import { FindManyOptions, FindOptionsWhere } from "typeorm";

export function generateOtp() {
    const code = randomInt(1000, 9999).toString();
    const expires_in = new Date(Date.now() + 1000 * 60 * 2);
    return {
        code,
        expires_in,
    }
}

export function relationalToDoListQuery(condition?: string, value?: any) {
    let where: FindOptionsWhere<ToDoListEntity> = {};
    if (condition && value) {
        where[condition] = value;
    }
    const query: FindManyOptions<ToDoListEntity> = {
        where,
        relations: ["user", "todo"],
        order: { id: "DESC" },
        select: {
            id: true,
            date: true,
            user: {
                id: true,
                firstname: true,
                lastname: true,
            },
            todo: {
                id: true,
                title: true,
                description: true,
                timeToDo: true,
                isDone: true,
            },
        }
    }
    return query;
}

export function relationalOptionInctancesQuery(condition?: string, value?: any) {
    let where: FindOptionsWhere<OptionsInctanceEntity> = {};
    if (condition && value) {
        where[condition] = value;
    }
    const query: FindManyOptions<OptionsInctanceEntity> = {
        where,
        relations: ["user", "option"],
        order: { id: "DESC" },
        select: {
            id: true,
            done: true,
            how_many_done: true,
            date: true,
            user: {
                id: true,
                firstname: true,
                lastname: true,
                image_profile: true,
            },
            option: {
                id: true,
                title: true,
                description: true,
                limitation: true,
            }
        }
    }
    return query;
}

export function relationalDrugInctancesQuery(condition?: string, value?: any) {
    let where: FindOptionsWhere<DrugInctanceEntity> = {};
    if (condition && value) {
        where[condition] = value;
    }
    const query: FindManyOptions<DrugInctanceEntity> = {
        where,
        relations: ["user", "drug"],
        order: { id: "ASC" },
        select: {
            id: true,
            done: true,
            date: true,
            user: {
                id: true,
                firstname: true,
                lastname: true,
                image_profile: true,
            },
            drug: {
                id: true,
                name: true,
                description: true,
                length: true,
            }
        }
    }
    return query;
}