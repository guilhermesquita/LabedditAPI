import { BrandDatabase } from "../database/brand-database"
import { ProductDatabase } from "../database/product-database"
import { BrandDB } from "../entity/brand-entity"
import { Product } from "../models/Product"

export class ProductBusiness {

    constructor(
        private productDatabase: ProductDatabase,
        private brandDatabase: BrandDatabase
    ){}

    public getProducts = async (q: string | undefined) => {
        if (q){
            const productsDb = await this.productDatabase.getAllProductsByName(q)
            const brandsDb = await this.brandDatabase.getAllBrands()

            const getBrands = (brand_id: string):BrandDB => {
                const brand = brandsDb.find((brand)=>{
                    return brand.id === brand_id
                })

                return{
                    id: brand_id,
                    name: brand.name
                }
            }

            const output = productsDb.map((productDB) => {

                const product = new Product(
                    productDB.id,
                    productDB.name,
                    productDB.price,
                    getBrands(productDB.cd_brand)
                )

                return {
                    id: product.get_id(),
                    name: product.get_name(),
                    price: product.get_price(),
                    brand: product.get_brand()
                }
            })

            return output;
        } else {
            const productsDb = await this.productDatabase.getAllProducts()
            const brandsDb = await this.brandDatabase.getAllBrands()
            
            const getBrands = (brand_id:string) => {
                const brand = brandsDb.find((brand)=>{
                    return brand.id === brand_id
                })

                return{
                    id: brand_id,
                    name: brand.name
                }
            }

            const output = productsDb.map((productDB) =>{

                const product = new Product(
                    productDB.id,
                    productDB.name,
                    productDB.price,
                    getBrands(productDB.cd_brand)
                )

                return {
                    id: product.get_id(),
                    name: product.get_name(),
                    price: product.get_price(),
                    brand: product.get_brand(), 
                }
            })

            return output;
        }
    }
}