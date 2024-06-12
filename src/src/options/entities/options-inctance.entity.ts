import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { OptionsEntity } from "./options.entity";
import { UserEntity } from "src/src/user/entities/user.entity";

@Entity(EntityName.OptionsInctance)
export class OptionsInctanceEntity extends BaseEntity {
    @Column()
    date: string;
    @Column({ default: false })
    done: boolean;
    @Column({ nullable: true })
    how_many_done: number;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    optionId: Number;
    @Column()
    userId: Number;
    @ManyToOne(() => OptionsEntity, option => option.inctances, { onDelete: "CASCADE" })
    option: OptionsEntity;
    @ManyToOne(() => UserEntity, user => user.option_inctances, { onDelete: "CASCADE" })
    user: UserEntity;
}