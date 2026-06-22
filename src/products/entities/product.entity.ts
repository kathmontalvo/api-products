import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({name: 'product_name'})
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'date', default: new Date })
  creationDate: Date;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;
}
