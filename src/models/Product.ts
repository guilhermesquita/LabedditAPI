import { BrandDB } from "../entity/brand-entity";
import { ProductDB } from "../entity/product-entity";

export interface Iproduct{
    id: string,
    name: string,
    price: number,
    brand: {
        id: string,
        name: string
    }
}

export class Product{
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private brand: {
            id: string,
            name: string
        }
    ){}

    public get_id(): string {
        return this.id;
    }

    public get_name(): string {
        return this.name;
    }

    public get_price(): number {
        return this.price;
    }
    
    public get_brand(): BrandDB {
        return this.brand;
    }

    public set_id(id: string) {
        this.id = id;
    }

    public set_name(name: string) {
        this.name = name;
    }

    public set_price(price: number) {
        this.price = price;
    }

    public set_brand(brand: BrandDB) {
        this.brand = brand;
    }

    public toDBModel(): ProductDB{
        return{
            id: this.id,
            name: this.name,
            price: this.price,
            brand: this.brand.id
        }
    }

    public toBusinessModel(productDB: ProductDB, brand: BrandDB): Product {
        return new Product(
            productDB.id,
            productDB.name,
            productDB.price,
            brand
    )}
}