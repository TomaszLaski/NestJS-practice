import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
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
}
