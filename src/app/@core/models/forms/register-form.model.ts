import { FormControl } from "@angular/forms";

export interface RegisterForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    phone: FormControl<string>;
    address: FormControl<string>;
    dni: FormControl<string>;
}