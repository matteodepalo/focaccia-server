import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { BaseEntity } from 'src/base.entity'

@Entity('recipes')
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  name!: string

  @Index()
  @Column({ nullable: false })
  userId!: string
}