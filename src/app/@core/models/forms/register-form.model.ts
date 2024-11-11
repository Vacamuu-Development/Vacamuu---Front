import { FormControl } from "@angular/forms";

export interface RegisterForm {
    firstname: FormControl<string>;
    lastname: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    phone: FormControl<string>;
    address: FormControl<string>;
    dni: FormControl<string>;
}