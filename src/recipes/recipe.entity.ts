import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  title!: string

  @Column({ nullable: false })
  description!: string
}