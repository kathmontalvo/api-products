import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductDTO } from './products/DTOs/product.dto';
import { AuthGuard } from './auth/auth.guard';

@Controller('product')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getProducts(): Product[] {
    return this.appService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.appService.getProductById(id)
  }

  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() product: ProductDTO): Product {
    return this.appService.createProduct(product)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDTO) {
    return this.appService.updateProduct(id, product)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }
}
