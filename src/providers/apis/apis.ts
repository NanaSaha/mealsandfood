import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApisProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApisProvider Provider');
  }

  signup_url = 'http://www.mealsapi.tk/account_creation';
  login_url = 'http://www.mealsapi.tk/account_access';
  retrieve_url = 'http://www.mealsapi.tk/retrieve_details'

  retrieve_all_meals_url = 'http://www.mealsapi.tk/fetch_all_meals'
  retrieve_all_locations_url = 'http://www.mealsapi.tk/fetch_all_location'

  fetch_restaurants_url = 'http://www.mealsapi.tk/fetch_restaurants/'
  fetch_restaurants_menu_url = 'http://www.mealsapi.tk/restaurant_menu/'
  retrieve_restaurant_menu_url = 'http://www.mealsapi.tk/retrieve_restaurant_menu'
  meal_details_url = 'http://www.mealsapi.tk/meal_details'

  process_orders_url = 'http://www.mealsapi.tk/process_orders';
  display_orders_url = 'http://www.mealsapi.tk/displayOrderDetails'
  save_address_url = 'http://www.mealsapi.tk/save_address'
  update_address_url = 'http://www.mealsapi.tk/update_address'
  retrieve_address_details_url = 'http://www.mealsapi.tk/retrieve_address_details'
  



  signup(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.signup_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.login_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  retrieve_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.retrieve_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }




  retrieve_all_meals() {
    return new Promise((resolve, reject) => {
      this.http.get(this.retrieve_all_meals_url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  retrieve_all_locations() {
    return new Promise((resolve, reject) => {
      this.http.get(this.retrieve_all_locations_url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  fetch_restaurants(data) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetch_restaurants_url + data, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  fetch_restaurant_menus(data) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetch_restaurants_menu_url + data, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  retrieve_restaurant_menu(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.retrieve_restaurant_menu_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }




  meal_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.meal_details_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  process_order(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.process_orders_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  display_orders(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.display_orders_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  save_address(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.save_address_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_address(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.update_address_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  retrieve_address_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.retrieve_address_details_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  
  

}


export class MenuItem {
  id: number;
  meals_id: string;
  meals_name: string;
  price: number;
  discount: string;
  meal_logo_url: string;

  constructor(id: number,meals_id: string, meals_name: string, price: number, discount: string, meal_logo_url: string) {
    this.id = id;
    this.meals_id = meals_id;
    this.meals_name = meals_name;
    this.price = price;
    this.discount = discount;
    this.meal_logo_url = meal_logo_url;
  }
}




export class CartItem {

  id: number;
  meals_name: string;
  meals_id: string;
  price: number;
  discount: string;
  quantity: number;
  meal_logo_url: string;

  constructor(item: MenuItem, quantity: number) {
    this.id = item.id;
    this.meals_id = item.meals_id;
    this.meals_name = item.meals_name;
    this.price = item.price;
    this.discount = item.discount;
    this.quantity = quantity;
    this.meal_logo_url = item.meal_logo_url;

  }
}


@Injectable()
export class CartService {
  list: Array<CartItem>;

  constructor() {
    this.list = []
  }

  getAllCartItems() {
    return this.list;
  }

  addItem(product: MenuItem, quantity: number) {

    var isExists: boolean = false;
    // var id = product.id;
    var id = product.meals_id;

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].meals_id == id) {
        this.list[i].quantity += quantity;
        isExists = true;
        break;
      }
    }
    if (!isExists) {
      this.list.push(new CartItem(product, quantity));
    }
  }

  quantityPlus(item) {
    item.quantity += 1;
  }

  quantityMinus(item) {
    item.quantity -= 1;
  }

  removeItemById(id) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) {
        this.list.splice(i, 1);
        break;
      }
    }
  }


  getGrandTotal(): number {
    var amount = 0;
    for (var i = 0; i < this.list.length; i++) {
      amount += (this.list[i].price * this.list[i].quantity);
    }
    return amount;
  }



}

