import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { ToDoListEntity } from "src/src/todolist/entities/todolist.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "src/src/user/entities/user.entity";
import { OptionsInctanceEntity } from "./options-inctance.entity";

@Entity(EntityName.Options)
export class OptionsEntity extends BaseEntity {
    @Column()
    title: string;
    @Column({ nullable: true })
    description: string;
    @Column({ default: true })
    active: boolean;
    @Column({ nullable: true })
    limitation: number;
    @Column()
    userId: number;
    @ManyToOne(() => UserEntity, user => user.options, { onDelete: "CASCADE" })
    user: UserEntity;
    @OneToMany(() => OptionsInctanceEntity, option_inctances => option_inctances.option)
    inctances: OptionsInctanceEntity[];
}