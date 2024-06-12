import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { TodoEntity } from "../../todo/entities/todo.entity";
import { OptionsEntity } from "src/src/options/entities/options.entity";

@Entity(EntityName.Todolist)
export class ToDoListEntity extends BaseEntity {
    @Column()
    date: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @Column()
    userId: number;
    @ManyToOne(() => UserEntity, user => user.todolist, { onDelete: "CASCADE" })
    user: UserEntity;
    @OneToMany(() => TodoEntity, todo => todo.todolist)
    todo: TodoEntity[];
}
