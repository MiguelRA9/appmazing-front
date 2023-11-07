import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent implements OnInit{
  contacts: any = []; //Este es el datasource que se conge en el html

  constructor(private contactsService: ContactsService){};

  ngOnInit(): void {
      this.contactsService.getContacts().subscribe(data => {
        this.contacts = data;
      })
  }

  displayedColumns: string[] = ['id', 'name', 'first_surname', 'second_surname', 'phone', 'email'];
}
