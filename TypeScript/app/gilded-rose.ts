export interface IItem {
  name: string;
  sellIn: number;
  quality: number;
  decreaseSellIn: () => void;
  decay: (decayRate?: number) => void;
  increaseQuality: (increaseRate?: number) => void;
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      (item as IItem).decay();
    });

    return this.items;
  }
}
