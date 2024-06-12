import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { DrugInctanceEntity } from "./drug-inctance.entity";

@Entity(EntityName.Drug)
export class DrugEntity extends BaseEntity {
    @Column()
    name: string;
    @Column({ nullable: true })
    description: string;
    @Column()
    length: number;
    @Column({ default: true })
    active: boolean;
    @Column({ nullable: true })
    time: string;
    @Column()
    userId: number;
    @ManyToOne(() => UserEntity, user => user.drugs, { onDelete: "CASCADE" })
    user: UserEntity;
    @OneToMany(() => DrugInctanceEntity, inctances => inctances.drug)
    inctances: DrugInctanceEntity[];
}
