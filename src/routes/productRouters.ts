import express from 'express'
import { ProductController } from '../controller/product-controller';
import { ProductBusiness } from '../business/product-business';
import { ProductDatabase } from '../database/product-database';
import { BrandDatabase } from '../database/brand-database';

export const productRouter = express.Router();

const productDatabase = new ProductDatabase()
const brandDatabase = new BrandDatabase()

const productController = new ProductController(
    new ProductBusiness(productDatabase, brandDatabase)
)

productRouter.get('/', productController.getProducts)
