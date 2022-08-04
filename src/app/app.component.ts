import { Component } from '@angular/core';

import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/id/15/250';
  showImg = true;
  token = '';

  // onLoaded(img: string) {
  //   console.log(`Image ${img} is loaded from Parent`);
  // }

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }

  constructor(private usersService: UsersService) {}

  createUser() {
    this.usersService
      .create({
        name: 'Nombre',
        email: 'email@mail.com',
        password: '123456',
      })
      .subscribe((data) => console.log(data));
  }
}
