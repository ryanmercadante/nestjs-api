import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number
  ) {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
    return { id: generatedId }
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts()
  } 

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string, 
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productsService.updateProduct(id, title, description, price)
    return null
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id)
    return null
  }
}