import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/';
import { MatDialogRef } from '@angular/material';
import { StudentsService } from '../students.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [StudentsService]
})
export class AddStudentComponent implements OnInit {
  addForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(new Date()),
    class: new FormControl(null)
  });

  token: any;
  maxDate = new Date();
  constructor(
    public dialog: MatDialogRef<AddStudentComponent>,
    private snackBar: MatSnackBar,
    public student: StudentsService,
    public router: Router

  ) { }


  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(this.student.name, [
        Validators.required,
        Validators.minLength(4)
      ]),

      email: new FormControl(this.student.email, Validators.required),
      dob: new FormControl(this.student.dob, Validators.required),
      class: new FormControl(this.student.class, Validators.required),
    });
    this.token = localStorage.getItem('focaloid');
  }

  get name() { return this.addForm.get('name'); }
  get email() { return this.addForm.get('email'); }
  get dob() { return this.addForm.get('dob'); }
  get class() { return this.addForm.get('class'); }

  add() {
    console.log(this.addForm.value);
    this.student.add(
      this.name.value,
      this.email.value,
      this.dob.value,
      this.class.value
    );
    this.dialog.close();
    this.router.navigateByUrl('/students');
  }

  /*CLOSE DIALOG*/
  close() {
    this.dialog.close();
  }
}
