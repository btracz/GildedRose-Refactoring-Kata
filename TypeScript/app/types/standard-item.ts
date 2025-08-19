import { MAX_QUALITY } from "../constants";
import { IItem, Item } from "../gilded-rose";

export class StandardItem extends Item implements IItem {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {
    super(name, sellIn, quality);
  }

  /**
   * Decreases the sellIn date by 1.
   * This method is called every day to update the item's sellIn date.
   * It is used by the decay method to determine how quality should change.
   */
  decreaseSellIn() {
    this.sellIn -= 1;
  }

  /**
   * Decreases the quality of the item.
   * If the sellIn date has passed, quality decreases twice as fast.
   * @param decayRate Rate at which quality decreases, default is 1
   */
  decay(decayRate: number = 1) {
    this.decreaseSellIn();

    // If sellIn is negative, quality decreases twice as fast
    if (this.sellIn < 0 && this.quality > 0) {
      this.quality -= decayRate * 2;
    } else {
      this.quality -= decayRate;
    }

    // Ensure quality does not drop below 0
    if (this.quality < 0) {
      this.quality = 0;
    }
  }

  /**
   * Increases the quality of the item.
   * @param increaseRate Rate at which quality increases, default is 1
   */
  increaseQuality(increaseRate: number = 1) {
    this.quality += increaseRate;

    // Ensure quality does not exceed maximum
    if (this.quality > MAX_QUALITY) {
      this.quality = MAX_QUALITY;
    }
  }
}
