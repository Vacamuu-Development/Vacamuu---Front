import { FormControl } from "@angular/forms";

export interface ProductsForm {
    name: FormControl<string>;
    price: FormControl<number>;
    description: FormControl<string>;
    image: FormControl<string>;
    idCategory: FormControl<number>;
}