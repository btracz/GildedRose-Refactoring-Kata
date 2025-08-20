import { StandardItem } from "./standard-item";

export class ConjuredItem extends StandardItem {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  override decay() {
    // Conjured items degrade in quality twice as fast
    super.decay(2);
  }
}
