import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  completed: boolean;

  constructor() {
    super();
    this.id = 0; 
    this.title = '';
    this.description = '';
    this.completed = false;
  }
}
