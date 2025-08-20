import { StandardItem } from "./standard-item";

export class AgedBrie extends StandardItem {
  constructor(sellIn: number, quality: number, name = "Aged Brie") {
    super(name, sellIn, quality);
  }

  /**
   * Increases the quality of Aged Brie.
   * The quality increases by 1 each day, and does not decrease.
   */
  override decay() {
    this.decreaseSellIn();

    if (this.sellIn < 0) {
      // After sellIn date, quality increases by 2
      this.increaseQuality(2);
    } else {
      // Before sellIn date, quality increases by 1
      this.increaseQuality();
    }
  }
}
