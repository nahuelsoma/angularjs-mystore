import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  img: string = '';

  @Input('imge')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log(`change image only:`, this.img);
  }

  @Input() alt: string = '';
  defaultImage = '../../../assets/image/default-image.jpg';
  // counter = 0;
  // counterFunction: number | undefined;

  @Output() loaded = new EventEmitter<string>();

  constructor() {
    // run before render
    // do not run async functions here
    // it runs only once per component creation
    // console.log('constructor', 'img value:', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // run before render
    // run many times, once every change occur, it recharges at inputs changes
    // stay listening
    // detect changes here
    // console.log('ngOnChanges', 'img value:', this.img);
    // console.log('changes', changes);
  }

  ngOnInit(): void {
    // run before render
    // run async functions here
    // run only once time at inicialization
    // do not detect changes here
    // console.log('ngOnInit', 'img value:', this.img);
    // this.counterFunction = window.setInterval(() => {
    //   // setInterval continues running even if not rendered, it needs to be destroyed
    //   this.counter += 1;
    //   console.log('counter running');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // run after render
    // children handler
    // console.log('ngAfterViewInit', 'img value:', this.img);
  }

  ngOnDestroy(): void {
    // run on component delete
    // console.log('ngOnDestroy', 'img value:', this.img);
    // window.clearInterval(this.counterFunction); // make interval to stop running on destroy
  }

  imgLoader() {
    // console.log(`Image ${this.img} is loaded from Child`);
    this.loaded.emit(this.img);
  }

  imgError() {
    this.img = this.defaultImage;
  }
}
