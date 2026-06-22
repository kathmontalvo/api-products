import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductDTO } from './products/DTOs/product.dto';
import { AuthGuard } from './auth/auth.guard';

@Controller('product')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.appService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.appService.getProductById(id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() product: ProductDTO): Promise<Product> {
    return await this.appService.createProduct(product)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: ProductDTO): Promise<Product> {
    return await this.appService.updateProduct(id, product)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.appService.deleteProduct(id);
  }
}
