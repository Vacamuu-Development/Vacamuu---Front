import { FormControl } from "@angular/forms";

export interface RegisterEmployeeForm {
    firstname: FormControl<string>;
    lastname: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    phone: FormControl<string>;
    dni: FormControl<string>;
}