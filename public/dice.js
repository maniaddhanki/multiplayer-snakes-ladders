class Dice {
  #faces;
  constructor() {
    this.#faces = [,
      { face: 1, img: 'images/1face.jpg' },
      { face: 2, img: 'images/2face.jpg' },
      { face: 3, img: 'images/3face.jpg' },
      { face: 4, img: 'images/4face.jpg' },
      { face: 5, img: 'images/5face.jpg' },
      { face: 6, img: 'images/6face.jpg' }
    ];
  }

  roll() {
    const face = Math.ceil(Math.random() * 6);
    return this.#faces[face];
  }
}
;
