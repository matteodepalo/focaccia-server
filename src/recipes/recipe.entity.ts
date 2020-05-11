import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { BaseEntity } from 'src/base.entity'

@Entity('recipes')
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Index()
  @Column()
  userId!: string

  @Column({ nullable: true })
  yeastType?: string

  @Column({ nullable: true })
  yeastWeight?: number
}