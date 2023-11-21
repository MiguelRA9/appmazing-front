import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  initialLetter = [];
  contactsByFullName = [];
  emailExtensions = [];
  phonePrefixData = [];
  productsInitialLetter = [];
  productsPerCategory = [];
  productsAvailability = [];
  productsStockRange = [];

  constructor(private contactService: ContactsService, private productService: ProductsService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(data =>{
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtensions = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);
    })
    this.productService.getProducts().subscribe(data =>{
      this.productsInitialLetter = this.calculateProductsPerInitialLetter(data)
      this.productsPerCategory = this.calculateProductsPerCategory(data)
      this.productsAvailability = this.calculateProductsPerAvailability(data)
      this.productsStockRange = this.calculateProductsStockRange(data)
    })
  }

  calculateInitialLettersData(contacts: any[]): any {
    return contacts.reduce((result, contact)=>{
      const initial = contact.first_surname.charAt(0).toUpperCase();
      if(result.find(item => item.name === initial)){
        result.find(item => item.name === initial).value++
      } else {
        result.push({name: initial, value: 1})
      }
      return result;
    }, [])
  }

  calculateContactsByFullNameData(contacts: any[]): any {
    let tempContactsByFullName = [{
      name: 'Contacts',
      series: []
    }];
    contacts.forEach(contact =>{
      const fullName = contact.name + contact.first_surname + contact.second_surname;
      const size = fullName.length;
      const range = `${size - (size % 5)}-${size - (size % 5) + 4} ch.`;
      let existingRange = tempContactsByFullName[0].series.find(item => item.name === range);
      if(existingRange){
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({name: range, value: 1});
      }
    });

    return tempContactsByFullName.map(entry =>{
      return{
        ...entry,
        series: entry.series.sort((a, b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
      }
    })
  }

  calculateEmailExtensionsData(contacts: any[]): any{
    let emailExtensionsMap = new Map<string, number>();

    contacts.forEach(contact =>{
      let emailParts = contact.email.split('@');
      if(emailParts.length == 2){
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf('.');
        if(firstDotIndex != -1){
          const extension = domain.substring(firstDotIndex);
          if(emailExtensionsMap.has(extension)){
            emailExtensionsMap.set(extension, emailExtensionsMap.get(extension)+1)
          }else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });

    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) =>{
      emailExtensions.push({name: key, value: value});
    });

    return emailExtensions;
  }

  generatePhonePrefixData(contacts: any[]): any {
    let phonePrefixData = [];
    let prefixCounts = {};
    contacts.forEach(contact =>{
      const phonePrefix = contact.phone.substring(0, 1);
      if(prefixCounts[phonePrefix]){
        prefixCounts[phonePrefix]++;
      }else {
        prefixCounts[phonePrefix] = 1;
      }
    });
    for(let prefix in prefixCounts){
      if(prefixCounts.hasOwnProperty(prefix)){
        phonePrefixData.push({name: prefix, value: prefixCounts[prefix]})
      }
    }
    return phonePrefixData;
  }

  calculateProductsPerInitialLetter(products: any): any{
    return products.reduce((result, product) =>{
      const initial = product.name.charAt(0).toUpperCase();
      if(result.find(item => item.name === initial)){
        result.find(item => item.name === initial).value++
      } else {
        result.push({name: initial, value: 1})
      }
      return result;
    }, [])
  }

  calculateProductsPerCategory(products: any[]): any{
    return products.reduce((result, product) => {
      const category = product.category.name;
      if(result.find(item => item.name === category)) {
        result.find(item => item.name === category).value++
      } else {
        result.push({name: category, value: 1});
      }
      return result;
    }, []);
  }

  calculateProductsPerAvailability(products: any[]): any {
  return products.reduce((result, product) => {
    const availability = product.active;
    if(result.find(item => item.name === availability)) {
      result.find(item => item.name === availability).value++
    } else {
      result.push({name: availability, value: 1});
    };
    return result;
  }, []);
  }

  calculateProductsStockRange(products: any): any {
    //Calcular que productos necesitan reponer stock urgentemente (entre 0 y 50, Low stock), cuantos tienen Medium Stock y cuantos High Stock
    let tempProductsByStock = [{
      name: 'Stock',
      series: []
    }];
    products.forEach(product => {
      const stock = product.stock;
      const range = this.getStockRange(stock);
      let existingRange = tempProductsByStock[0].series.find(item => item.name === range);
      if(existingRange) {
        existingRange.value++;
      } else {
        tempProductsByStock[0].series.push({name: range, value: 1});
      }
    });
    return tempProductsByStock.map(entry => {
      return {
        ...entry,
        series: entry.series.sort((a, b) => a.name.localeCompare(b.name))
      };
    });
  }

  getStockRange(stock: number): string {
    if(stock < 50) {
      return 'Low stock: resupply';
    } else if (stock >= 50 && stock <=150) {
      return 'Medium stock: watch';
    } else if (stock > 150) {
      return 'High stock';
    } else {
      'Error'
    }
  } 
  
}
