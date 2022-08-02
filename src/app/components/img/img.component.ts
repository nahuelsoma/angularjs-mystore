import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() img: string = 'img value';
  defaultImage = 'https://picsum.photos/id/1/250';

  @Output() loaded = new EventEmitter<string>();

  constructor() {
    // run before render
    // do not run async functions here
    // it runs only once per component creation
    console.log('constructor', 'img value:', this.img);
  }

  ngOnChanges(): void {
    // run before render
    // run many times, once every change occur, it recharges at inputs changes
    // stay listening
    // detect changes here
    console.log('ngOnChanges', 'img value:', this.img);
  }

  ngOnInit(): void {
    // run before render
    // run async functions here
    // run only once time at inicialization
    // do not detect changes here
    console.log('ngOnInit', 'img value:', this.img);
  }

  ngAfterViewInit(): void {
    // run after render
    // children handler
    console.log('ngAfterViewInit', 'img value:', this.img);
  }

  ngOnDestroy(): void {
    // run on component delete
    console.log('ngOnDestroy', 'img value:', this.img);
  }

  imgLoader() {
    console.log(`Image ${this.img} is loaded from Child`);
    this.loaded.emit(this.img);
  }

  imgError() {
    this.img = this.defaultImage;
  }
}
