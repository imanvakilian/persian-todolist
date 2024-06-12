import { BaseEntity } from "src/common/base/entity.base";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { ToDoListEntity } from "../../todolist/entities/todolist.entity";

@Entity(EntityName.Todo)
export class TodoEntity extends BaseEntity {
    @Column()
    title: string;
    @Column({ nullable: true })
    description: string;
    @Column({ default: false })
    isDone: boolean;
    @Column({ nullable: true })
    timeToDo: string;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    todolistId: number;
    @ManyToOne(() => ToDoListEntity, todolist => todolist.todo, { onDelete: "CASCADE" })
    todolist: ToDoListEntity;
}