import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceService) { }


/***
   * This function shows the alert pop up to allow user to add or edit item name and quantity
   * and finally saves the item into the list
   */
 showPrompt(item?, index?) {
  const prompt = this.alertCtrl.create({
    header: item ? 'Edit Item' : 'Add Item',
    message: item ? "Please edit item..." : "Please enter item...",
    inputs: [
      {
        name: 'name',
        placeholder: 'Name',
        value: item ? item.name : null
      },
      {
        name: 'quantity',
        type: 'number',
        min: 1,
        max:20,
        placeholder: 'Quantity',
        value: item ? item.quantity : null
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: item => {
          console.log('Saved clicked', item);
          if (index !== undefined) {
            this.dataService.editItem(item, index);
          } else {
            this.dataService.addItem(item);
          }
        }
      }
    ]
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }    
}
