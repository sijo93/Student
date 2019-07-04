import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';


export interface Student {
  name: string;
  email: string;
  dob: Date;
  class: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public students: Student[] = [];
  name: any;
  email: any;
  dob: any;
  class: any;

  constructor() {
    if (localStorage.getItem('students')) {
      this.students = JSON.parse(localStorage.getItem('students'));
    }

  }

  getStudents(): Observable<any> {
    const students = new Observable((observer) => {
      observer.next(JSON.parse(localStorage.getItem('students')));
    });
    console.log('service', this.students);

    return students;
  }


  add(stdName, stdEmail, stdDob, stdClass) {
    this.students.push({
      name: stdName,
      email: stdEmail,
      dob: stdDob,
      class: stdClass
    });
    console.log(this.students);
    localStorage.setItem('students', JSON.stringify(this.students));

  }

}
