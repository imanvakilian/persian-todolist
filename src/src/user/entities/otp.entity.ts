import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, OneToOne, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity {
    @Column()
    code: string;
    @Column()
    expires_in: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @Column()
    userId: number;
    @OneToOne(() => UserEntity, user => user.otp, { onDelete: "CASCADE" })
    user: UserEntity;
}