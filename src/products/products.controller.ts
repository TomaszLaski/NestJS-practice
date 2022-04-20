import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Post()
  addProduct(@Body() item: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.addProduct(item));
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  @Get(':id')
  getProductById(@Param('id') id): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get()
  getAllProducts(): Array<Product> {
    return this.productRepository.getAllProducts();
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') id): void {
    return this.productRepository.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id,
    @Body() dto: UpdateProductDto,
  ): UpdateProductDto {
    return this.productRepository.updateProduct(id, dto);
  }
}
