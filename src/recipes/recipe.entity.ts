import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title?: string

  @Column()
  description?: string
}