import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { DrugEntity } from "./drug.entity";
import { UserEntity } from "src/src/user/entities/user.entity";

@Entity(EntityName.DrugInctance)
export class DrugInctanceEntity extends BaseEntity {
    @Column()
    date: string;
    @Column({ default: false })
    done: boolean;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    drugId: Number;
    @Column()
    userId: Number;
    @ManyToOne(() => DrugEntity, drug => drug.inctances, { onDelete: "CASCADE" })
    drug: DrugEntity;
    @ManyToOne(() => UserEntity, user => user.drug_inctances, { onDelete: "CASCADE" })
    user: UserEntity;
}