import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products/entities/product.entity';
import { ProductDTO } from './products/DTOs/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  private db: Product[] = [
    {
      id: '1',
      name: 'Laptop DMC',
      price: 10,
      creationDate: new Date(),
      inStock: true
    },
    {
      id: '2',
      name: 'Mouse DMC',
      price: 5,
      creationDate: new Date(),
      inStock: true
    },
    {
      id: '3',
      name: 'Keyboard DMC',
      price: 7,
      creationDate: new Date(),
      inStock: false
    },
    {
      id: '4',
      name: 'Monitor DMC',
      price: 15,
      creationDate: new Date(),
      inStock: true
    },
    {
      id: '5',
      name: 'Headphones DMC',
      price: 8,
      creationDate: new Date(),
      inStock: false
    }

  ];

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  /** CRUD operations:
   * - Create: POST
   * - Read: GET
   * - Update: PUT
   * - Delete: DELETE
   */


  // GET method: list items
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  async getProductById(id: string): Promise<Product> {

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`The product with id ${id} was not found.`)
    }

    return product;
  }

  // POST method: create item

  async createProduct(product: ProductDTO): Promise<Product> {

    const newProduct = await this.productRepository.create(product)
    return await this.productRepository.save(newProduct);
  }

  // PUT method: update item

  async updateProduct(id: string, updatedProduct: ProductDTO): Promise<Product> {
    const previousProduct = await this.getProductById(id);

    const finalProduct = this.productRepository.merge(previousProduct, updatedProduct)

    return await this.productRepository.save(finalProduct);
  }

  // DELETE method: delete item
  async deleteProduct(id: string) {
    const previousProduct = await this.getProductById(id);
    await this.productRepository.remove(previousProduct);

    return await this.getProducts();
  }


}
