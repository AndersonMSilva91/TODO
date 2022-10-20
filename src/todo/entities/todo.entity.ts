import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_todo"})
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length:200, nullable: false})
    description: string

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    status: string

    todo: Todo
}