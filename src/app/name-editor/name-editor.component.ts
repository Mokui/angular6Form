import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})

export class NameEditorComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    formattedMessage;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.onChanges();
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onChanges(): void {
      this.registerForm.valueChanges.subscribe(val => {
        this.formattedMessage =
        `
        My name is ${val.firstName}  ${val.lastName}.

        My email is ${val.email}.`;
      });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        let user;
        user = new User();
        user.firstName = this.registerForm.value.firstName;
        user.lastName = this.registerForm.value.lastName;
        user.email = this.registerForm.value.email;
        user.password = this.registerForm.value.password;
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(user));
    }
}

export class User {
  firstName: number;
  lastName: string;
  email: string;
  password: string;
}
