import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
var shortid = require('shortid');

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDto): Product {
    newProduct.id = shortid.generate();
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();
    this.products.push(newProduct);
    return newProduct;
  }

  deleteProduct(id: string): void {
    const deletedItem = this.getProductById(id);
    const index = this.products.indexOf(deletedItem);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  updateProduct(id: string, dto: UpdateProductDto): ExternalProductDto {
    this.products = this.products.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }

      return i;
    });

    return this.getProductById(id);
  }

  getProductById(id: string): ExternalProductDto {
    let itemFound = this.products.find((item) => {
      if (item.id === id) return true;
    });
    return {
      ...itemFound,
      createdAt: dateToArray(itemFound.createdAt),
      updatedAt: dateToArray(itemFound.createdAt),
    };
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
