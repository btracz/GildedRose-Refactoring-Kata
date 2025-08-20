import { SULFURAS_QUALITY } from "../constants";
import { StandardItem } from "./standard-item";

export class Sulfuras extends StandardItem {
  constructor(sellIn: number = 0, name: string = "Sulfuras, Hand of Ragnaros") {
    super(name, sellIn, SULFURAS_QUALITY);
  }

  override decay() {
    // Sulfuras does not change in quality or sellIn
  }
}
