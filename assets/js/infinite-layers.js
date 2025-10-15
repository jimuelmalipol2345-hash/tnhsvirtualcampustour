import InfiniteGrid from './infinite-grid copy.js';

export default class Index {
  constructor() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    
    this.sources = [
      {src: 'assets/images/featured/1.jpg', caption: '30 knots <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2021'},
      {src: 'assets/images/featured/2.jpg', caption: 'Sad Mis-Step <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
      {src: 'assets/images/featured/3.jpg', caption: 'Mini Orange <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2014'},
      {src: 'assets/images/featured/4.jpg', caption: 'After Storm <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'assets/images/featured/5.jpg', caption: 'Untitled <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2016'},
      {src: 'assets/images/featured/6.jpg', caption: 'Toilet Paper <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'assets/images/featured/7.jpg', caption: 'Cocoa Eggplant Tomato <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2025'},
      {src: 'assets/images/featured/8.jpg', caption: 'Toilet Paper <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'assets/images/featured/9.jpg', caption: 'Production Fun Fact (Eggs) <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
    ];
    this.data = [
      {x: 71, y: 58, w: 400, h: 270},
      {x: 211, y: 255, w: 540, h: 360},
      {x: 631, y: 158, w: 400, h: 270},
      {x: 1191, y: 245, w: 260, h: 195},
      {x: 351, y: 687, w: 260, h: 290},
      {x: 751, y: 824, w: 205, h: 154},
      {x: 911, y: 540, w: 260, h: 350},
      {x: 1051, y: 803, w: 400, h: 300},
      {x: 71, y: 922, w: 350, h: 260},
    ]
    new InfiniteGrid({
      el: document.querySelector('#images'),
      sources: this.sources,
      data: this.data,
      originalSize: {w: 1522, h: 1238},
    })
  }
  resize() {
    document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`);
  }
}
window.addEventListener('load', () => {
  new Index();
});