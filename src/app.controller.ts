import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductDTO } from './products/DTOs/product.dto';

@Controller('product')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts(): Product[] {
    return this.appService.getProducts();
  }

  @Get(':id')
  getProductById( @Param('id') id: string ): Product {
    return this.appService.getProductById(id)
  }

  @Post()
  createProduct( @Body() product: ProductDTO ): Product {
    return this.appService.createProduct(product)
  }

  @Put(':id')
  updateProduct(@Param('id') id:string, @Body() product: ProductDTO) {
    return this.appService.updateProduct(id, product)
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string) {
    return this.appService.deleteProduct(id);
  }
}
