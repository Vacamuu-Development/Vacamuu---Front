import { FormControl } from "@angular/forms";
import { products } from "../products.model";

export interface orderForm{
    products: FormControl<Array<products>>;
    address: FormControl<string>;
}