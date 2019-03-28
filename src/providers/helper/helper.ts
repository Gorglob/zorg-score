import { Injectable } from '@angular/core';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor() {    
  }

  getAvatar(index: number) {
    let indexString = "000" + (Math.abs(index) % 16);
    return "../../assets/imgs/avatars/avatar-" + indexString.substr(indexString.length - 2,2) + ".png";
  }

}
