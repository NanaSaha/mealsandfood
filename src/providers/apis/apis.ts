import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApisProvider {
  new_new_price: any;

  constructor(public http: HttpClient) {
    console.log('Hello ApisProvider Provider');
  }

  reset_password_get_phonenumber_url ='http://mealsapi.cybercityschool.com/reset_password_get_phonenumber';
  reset_password_get_smscode_url =  "http://mealsapi.cybercityschool.com/reset_password_get_reset_token";
  reset_password_new_password_url = "http://mealsapi.cybercityschool.com/reset_password_new_password";

  signup_url = 'http://mealsapi.cybercityschool.com/account_creation';
  login_url = 'http://mealsapi.cybercityschool.com/account_access';
  retrieve_url = 'http://mealsapi.cybercityschool.com/retrieve_details'

  retrieve_all_meals_url = 'http://mealsapi.cybercityschool.com/fetch_all_meals'
  retrieve_all_menu_url = 'http://mealsapi.cybercityschool.com/fetch_all_menu'
  retrieve_all_locations_url = 'http://mealsapi.cybercityschool.com/fetch_all_location'

  fetch_restaurants_url = 'http://mealsapi.cybercityschool.com/fetch_restaurants/'
  fetch_restaurants_menu_url = 'http://mealsapi.cybercityschool.com/restaurant_menu/'
  retrieve_restaurant_menu_url = 'http://mealsapi.cybercityschool.com/retrieve_restaurant_menu'
  meal_details_url = 'http://mealsapi.cybercityschool.com/meal_details'
  food_details_url = 'http://mealsapi.cybercityschool.com/food_details'

  process_orders_url = 'http://mealsapi.cybercityschool.com/process_orders';
  process_food_orders_url = 'http://mealsapi.cybercityschool.com/process_food_orders';
  
  save_address_url = 'http://mealsapi.cybercityschool.com/save_address'
  update_address_url = 'http://mealsapi.cybercityschool.com/update_address'

  update_list_url = 'http://mealsapi.cybercityschool.com/update_list'
  retrieve_address_details_url = 'http://mealsapi.cybercityschool.com/retrieve_address_details'

  order_details_url = 'http://mealsapi.cybercityschool.com/displayOrderDetails'
  food_order_details_url = 'http://mealsapi.cybercityschool.com/displayFoodOrderDetails'
  
  order_history_url = 'http://mealsapi.cybercityschool.com/displayOrders'
  food_order_history_url = 'http://mealsapi.cybercityschool.com/displayFoodOrders'

  fetch_foodstuff_menus_url = 'http://mealsapi.cybercityschool.com/food_menu'

  track_order_url = 'http://mealsapi.cybercityschool.com/track_order'

  create_list_url = 'http://mealsapi.cybercityschool.com/create_list'
  retrieve_list_details_url = 'http://mealsapi.cybercityschool.com/retrieve_list_details'
  place_weekly_order_url = 'http://mealsapi.cybercityschool.com/place_weekly_order'
  

  order_payment_url = 'https://www.testpayapi.tk/order_payment'
  payment_history_url = 'http://mealsapi.cybercityschool.com/payment_history'

  save_special_food_requests_url = 'http://mealsapi.cybercityschool.com/save_food_special_requests'


  retrieve_all_foods_url = 'http://mealsapi.cybercityschool.com/fetch_all_foods'




  save_special_request_food(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.save_special_food_requests_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  track_order(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.track_order_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  make_payment(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.order_payment_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  payment_history(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.payment_history_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


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

  retrieve_all_menu() {
    return new Promise((resolve, reject) => {
      this.http.get(this.retrieve_all_menu_url)
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

  retrieve_all_foods() {
    return new Promise((resolve, reject) => {
      this.http.get(this.retrieve_all_foods_url)
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


  fetch_foodstuff_menus() {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetch_foodstuff_menus_url)
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


  food_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.food_details_url, JSON.stringify(data))
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



  process_food_order(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.process_food_orders_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  

  order_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.order_details_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  food_order_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.food_order_details_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  order_history(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.order_history_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  food_order_history(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.food_order_history_url, JSON.stringify(data))
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

  update_list(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.update_list_url, JSON.stringify(data))
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

  create_list(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.create_list_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  retrieve_list_details(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.retrieve_list_details_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  place_weekly_order(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.place_weekly_order_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  reset_password_get_phonenumber(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.reset_password_get_phonenumber_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(console.log(JSON.stringify(err)));
        });
    });
  }

  reset_password_get_smscode(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.reset_password_get_smscode_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(console.log(JSON.stringify(err)));
        });
    });
  }


  reset_password_new_password(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.reset_password_new_password_url, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(console.log(JSON.stringify(err)));
        });
    });
  }

  
  

}


export class MenuItem {
  id: number;
  meals_id: string;
  meal_name: string;
  price: number;
  discount: string;
  meal_logo_url: string;

  constructor(id: number,meals_id: string, meal_name: string, price: number, discount: string, meal_logo_url: string) {
    this.id = id;
    this.meals_id = meals_id;
    this.meal_name = meal_name;
    this.price = price;
    this.discount = discount;
    this.meal_logo_url = meal_logo_url;
  }
}




export class CartItem {

  id: number;
  meal_name: string;
  meals_id: string;
  price: number;
  discount: string;
  quantity: number;
  meal_logo_url: string;

  constructor(item: MenuItem, quantity: number) {
    this.id = item.id;
    this.meals_id = item.meals_id;
    this.meal_name = item.meal_name;
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
    item.quantity += 1.00;
  }

  quantityMinus(item) {
    item.quantity -= 1.00;
  }

  removeItemById(id) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) {
        this.list.splice(i, 1);
        break;
      }
    }
  }


  removeallcart() {
    // return  this.list = []
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i]) {
        this.list.splice(i, 0);
        return  this.list = []
        
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








// FOODSTUFFS CART SERVICES

export class FoodMenuItem {
  id: number;
  food_id: string;
  food_name: string;
  price: number;
  discount: string;
  food_logo_url: string;

  constructor(id: number,food_id: string, food_name: string, price: number, discount: string, food_logo_url: string) {
    this.id = id;
    this.food_id = food_id;
    this.food_name = food_name;
    this.price = price;
    this.discount = discount;
    this.food_logo_url = food_logo_url;
  }
}




export class FoodCartItem {

  id: number;
  food_id: string;
  food_name: string;
  price: number;
  discount: string;
  quantity: number;
  food_logo_url: string;
  new_new_price: number;

  constructor(item: FoodMenuItem, quantity: number) {
    this.id = item.id;
    this.food_id = item.food_id;
    this.food_name = item.food_name;
    this.price = item.price;
    this.discount = item.discount;
    this.quantity = quantity;
    this.food_logo_url = item.food_logo_url;

  }
}


@Injectable()
export class FoodCartService {
  list: Array<FoodCartItem>;

  constructor() {
    this.list = []
  }

  getAllCartfoodItems() {
    return this.list;
  }

  addItem(product: FoodMenuItem, quantity: number) {

    var isExists: boolean = false;
    // var id = product.id;
    var id = product.food_id;

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].food_id == id) {
        this.list[i].quantity += quantity;
        isExists = true;
        break;
      }
    }
    if (!isExists) {
      this.list.push(new FoodCartItem(product, quantity));
    }
  }

  quantityPlus(item) {
  //   console.log(item)
  //   console.log(item.price)
    //item.price += parseFloat('1').toFixed(1);;

   item.price += 1;
   
  }

  quantityMinus(item) {
    item.price -= 1.00;
  }

  removeItemById(id) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) {
        this.list.splice(i, 1);
        break;
      }
    }
  }

  removeallfoodcart() {
    // return  this.list = []
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i]) {
        this.list.splice(i, 0);
        return  this.list = []
        
      }
    }
  }

  getGrandTotal(): number {
    var amount = 0;
    for (var i = 0; i < this.list.length; i++) {
      amount += (this.list[i].price);
    }
    return amount;
  }


  // getGrandTotal(): number {
  //   var amount = 0;
  //   for (var i = 0; i < this.list.length; i++) {
  //     amount += (this.list[i].price * this.list[i].quantity);
  //   }
  //   return amount;
  // }



}

