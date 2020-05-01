import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'src/base.entity'

@Entity('recipes')
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  name!: string
}