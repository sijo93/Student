import { StudentsService } from './students.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  lists: any;
  token: any = false;


  constructor(
    private students: StudentsService,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit() {
    this.getAllStudets();
    this.token = localStorage.getItem('focaloid');

  }

  getAllStudets(): void {
    this.students.getStudents()
      .subscribe(data => {
        data.forEach(value => {
          value.dobString = new Date(value.dob).toLocaleDateString('en-IN');
        });
        this.lists = data;
        console.log('list', this.lists);

      });
  }

  addStudent() {
    if (this.token) {
      const dialogone = this.dialog.open(AddStudentComponent, { disableClose: true });
      dialogone.afterClosed().subscribe(result => {
        setTimeout(() => {
          this.getAllStudets();
        }, 1000);

      });
      this.getAllStudets();

    } else {
      this.router.navigateByUrl('/login');
      this.getAllStudets();
    }


    // const dialogone = this.dialog.open(LoginComponent, { disableClose: true });
    // dialogone.afterClosed().subscribe(result => {
    // });
  }

  logout() {
    localStorage.removeItem('focaloid');
    location.reload();
  }


}
