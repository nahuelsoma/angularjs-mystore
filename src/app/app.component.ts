import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/id/15/250';
  showImg = true;

  // onLoaded(img: string) {
  //   console.log(`Image ${img} is loaded from Parent`);
  // }

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
