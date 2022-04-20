import { Tags } from 'src/enums/tags.enum';

export interface CreateProductDto {
  id: any;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}
