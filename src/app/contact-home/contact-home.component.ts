import { Component } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  first_surname: string;
  second_surname: string;
  phone: string;
  email: string;
}

const ELEMENT_DATA: Contact [] = [
  {id: 1, name: 'Gonzalo', first_surname: 'Arias', second_surname: 'Navarro', phone: '881934286', email: 'ariasnavarro75@gmail.com'},
  {id: 2, name: 'Pedro', first_surname: "Sanchez", second_surname: 'Mojito', phone: '675833879', email: 'prettymojito@gmail.com'},
  {id: 3, name: 'Pablo', first_surname: "Iglesias", second_surname: 'Martinez', phone: '635496494', email: 'pimelvice@gmail.com'},
  {id: 4, name: 'Bernadette', first_surname: "Rostenkowski", second_surname: 'Wolowitz', phone: '645376695', email: 'bigbang@gmail.com'},
  {id: 5, name: 'Bryce', first_surname: "Dallas", second_surname: 'Howard', phone: '609511657', email: 'dallas_howard@gmail.com'},
  {id: 6, name: 'Eliot', first_surname: "Jason", second_surname: 'Momoa', phone: '621567439', email: 'aquaman@gmail.com'},
  {id: 7, name: 'Germain', first_surname: "Kurt", second_surname: 'Cobain', phone: '632353058', email: 'nirvana@gmail.com'},
  {id: 8, name: 'Kiley', first_surname: "Joshless", second_surname: 'Nickless', phone: '671284556', email: 'jickless7@gmail.com'},
  {id: 9, name: 'Chandler', first_surname: "Muriel", second_surname: 'Bing', phone: '605606349', email: 'joker@gmail.com'},
  {id: 10, name: 'Penny', first_surname: "Kaley", second_surname: 'Cuoco', phone: '687141789', email: 'pennykc@gmail.com'},
  {id: 11, name: 'Abraham', first_surname: "Grigorian", second_surname: 'Lincoln', phone: '620330585', email: 'lincoln@gmail.com'},
  {id: 12, name: 'Chewie', first_surname: "Wookie", second_surname: 'Falcon', phone: '667338253', email: 'wookie@gmail.com'},
  {id: 13, name: 'Han', first_surname: "Solo", second_surname: 'Millenium', phone: '624939192', email: 'smuggler@gmail.com'},
  {id: 14, name: 'Lucky', first_surname: "Luke", second_surname: 'Dalton', phone: '602888884', email: 'lld@gmail.com'},
  {id: 15, name: 'Patricio', first_surname: "Ecuador", second_surname: 'Chiquito', phone: '659693074', email: 'chiquito@gmail.com'},
  {id: 16, name: 'Sandro', first_surname: "Barney", second_surname: 'Stinson', phone: '627794838', email: 'stinson@gmail.com'},
  {id: 17, name: 'Tony', first_surname: "Soprano", second_surname: 'Benettolo', phone: '659329308', email: 'thesoprano@gmail.com'},
  {id: 18, name: 'Ali', first_surname: "Ba", second_surname: 'Ba', phone: '684911221', email: 'alibaba@gmail.com'},
  {id: 19, name: 'Thomas', first_surname: "Robert", second_surname: 'Dylan', phone: '662296473', email: 'tdylan@gmail.com'},
];

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {
  displayedColumns: string[] = ['id', 'name', 'first_surname', 'second_surname', 'phone', 'email'];
  contacts = ELEMENT_DATA; //Este es el datasource que se conge en el html
}
