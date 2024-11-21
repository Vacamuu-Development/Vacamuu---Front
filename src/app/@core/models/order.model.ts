import { products } from "./products.model";

export interface order{
    products: Array<products>;
    address: string;
}