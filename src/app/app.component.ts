import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = 'https://picsum.photos/id/15/250';
  showImg = true;
  token = '';
  imgRta = '';

  // onLoaded(img: string) {
  //   console.log(`Image ${img} is loaded from Parent`);
  // }

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  createUser() {
    this.usersService
      .create({
        name: 'Nombre',
        email: 'email@mail.com',
        password: '123456',
        role: 'customer',
      })
      .subscribe((data) => console.log(data));
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my-file',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService
        .uploadFile(file)
        .subscribe((rta) => (this.imgRta = rta.location));
    }
  }
}
