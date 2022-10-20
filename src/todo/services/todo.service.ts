import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Todo } from "../entities/todo.entity";


@Injectable()

export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){ }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find({});
    }

    async findById(id: number): Promise<Todo> {
        let todo = await this.todoRepository.findOne({
            where: {
                id
            },
        });
        if (!todo)
            throw new HttpException('the Task wasnt found', HttpStatus.NOT_FOUND);
        return todo
    }
    async findByDescription(description: string): Promise<Todo[]> {
        return await this.todoRepository.find({
            where:{
                todo: ILike(`%${Todo}%`)
            }
        });
    }
    async findByStatus(status: string): Promise<Todo[]> {
        return await this.todoRepository.find({
            where:{
                todo: ILike(`%${Todo}%`)
            }
        });
    }
    async create(todo: Todo): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }
    async update(todo: Todo): Promise<Todo>{
        let buscaTodo: Todo = await this.findById(todo.id);
        if (!buscaTodo || !todo.id)
            throw new HttpException('we cant find this TO DO', HttpStatus.NOT_FOUND);
        return await this.todoRepository.save(todo);
        
    }
    async delete(id: number): Promise<DeleteResult>{
        let buscaTodo = await this.findById(id);
        if (!buscaTodo)
            throw new HttpException('This TO DO was not found', HttpStatus.NOT_FOUND);
        return await this.todoRepository.delete(id);
    }
}