import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  name: string;
  first_surname: string;
  second_surname: string;
  phone: string;
  email: string;

  constructor() { }

  ngOnInit() {
  }

  newContact(){
    const contact = {
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      phone: this.phone,
      email: this.email
    }
  }

}
