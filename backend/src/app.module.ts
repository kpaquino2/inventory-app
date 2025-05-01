import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
