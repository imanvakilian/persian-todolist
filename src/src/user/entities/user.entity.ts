import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { ToDoListEntity } from "src/src/todolist/entities/todolist.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { OptionsEntity } from "src/src/options/entities/options.entity";
import { OptionsInctanceEntity } from "src/src/options/entities/options-inctance.entity";
import { DrugEntity } from "src/src/drug/entities/drug.entity";
import { DrugInctanceEntity } from "src/src/drug/entities/drug-inctance.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    mobile: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column({ default: true })
    isVervify: boolean;
    // @Column({ nullable: true })
    // image_profile: string;
    @OneToMany(() => ToDoListEntity, todolist => todolist.user)
    todolist: ToDoListEntity[];
    @Column({ nullable: true })
    otpId: number;
    @OneToOne(() => OtpEntity, otp => otp.user)
    @JoinColumn({ name: "otpId" })
    otp: OtpEntity;
    @OneToMany(() => OptionsEntity, options => options.user)
    options: OptionsEntity[];
    @OneToMany(() => OptionsInctanceEntity, option_inctances => option_inctances.user)
    option_inctances: OptionsInctanceEntity[];
    @OneToMany(() => DrugEntity, drugs => drugs.user)
    drugs: DrugEntity[];
    @OneToMany(() => DrugInctanceEntity, drug_inctances => drug_inctances.user)
    drug_inctances: DrugInctanceEntity[];
}
