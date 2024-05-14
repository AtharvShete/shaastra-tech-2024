import { BaseEntity ,Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ default: false })
    completed!: boolean;
}
