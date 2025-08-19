import { StandardItem } from "./standard-item";

export class BackstagePass extends StandardItem {
  constructor(
    sellIn: number,
    quality: number,
    name = "Backstage passes to a TAFKAL80ETC concert"
  ) {
    super(name, sellIn, quality);
  }

  /**
   * Backstage passes increase in quality as the concert date approaches.
   * If sellIn is 10 or less, quality increases by 2.
   * If sellIn is 5 or less, quality increases by 3.
   * After the concert, quality drops to 0.
   */
  override decay() {
    this.decreaseSellIn();

    // If sellIn is less than 0, quality drops to 0
    if (this.sellIn < 0) {
      this.quality = 0;
    } else {
      // Backstage passes increase in quality
      this.increaseQuality();

      // If sellIn is less than 10, increase quality by another 1 (total 2)
      // strict < because we decremented sellIn above
      if (this.sellIn < 10) {
        this.increaseQuality();
      }

      // If sellIn is less than 5, increase quality by another 1 (total 3)
      // strict < because we decremented sellIn above
      if (this.sellIn < 5) {
        this.increaseQuality();
      }
    }
  }
}
