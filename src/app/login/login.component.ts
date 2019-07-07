import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = 'admin@admin.com';
  password = 'admin123';
  token: number;
  request: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(value) {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);

    // tslint:disable-next-line:align
    if (((this.loginForm.value.email) === this.email) && ((this.loginForm.value.password) === this.password)) {

      this.snackBar.open('Successfully Logged in', 'OKAY', {
        duration: 5000
      });
      this.router.navigateByUrl('/students');
      // const dialogone = this.dialog.open(AddStudentComponent, { disableClose: true });
      // dialogone.afterClosed().subscribe(result => {
      // });

      this.token = Math.random() * 100000;
      console.log(this.token);
      localStorage.setItem('focaloid', `${this.token}`);



    } else {
      this.snackBar.open('Check your email or password!', 'OKAY', {
        duration: 5000
      });
    }
  }

}
