import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products/entities/product.entity';
import { ProductDTO } from './products/DTOs/product.dto';

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

  /** CRUD operations:
   * - Create: POST
   * - Read: GET
   * - Update: PUT
   * - Delete: DELETE
   */


  // GET method: list items
  getProducts(): Product[] {
    return this.db;
  }

  getProductById(id: string): Product {

    const product = this.db.find(p => p.id == id);

    if (!product) {
      throw new NotFoundException(`The product with id ${id} was not found.`)
    }

    return product;
  }

  // POST method: create item

  createProduct(product: ProductDTO): Product {
    const newProduct: Product = {
      id: Math.random().toString(),
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      creationDate: new Date()
    }

    this.db.push(newProduct);
    return newProduct;
  }

  // PUT method: update item

  updateProduct(id: string, updatedProduct: ProductDTO) {
    const previousProduct = this.getProductById(id);
    const indexProduct = this.db.findIndex(p => p.id == id);

    this.db[indexProduct] = {
      ...previousProduct,
      ...updatedProduct
    }

    return this.db[indexProduct];
  }

  // DELETE method: delete item
  deleteProduct(id: string) {
    const previousProduct = this.getProductById(id);
    this.db = this.db.filter(p => p.id !== id);

    return this.getProducts();
  }


}
