import { StandardItem } from "../app/types/standard-item";
import { GildedRose } from "../app/gilded-rose";
import { AgedBrie } from "../app/types/aged-brie";
import { Sulfuras } from "../app/types/sulfuras";
import { BackstagePass } from "../app/types/backstage-pass";
import { ConjuredItem } from "../app/types/conjured-items";

console.log("OMGHAI!");

const items = [
  new StandardItem("+5 Dexterity Vest", 10, 20),
  new AgedBrie(2, 0),
  new StandardItem("Elixir of the Mongoose", 5, 7),
  new Sulfuras(0),
  new Sulfuras(-1),
  new BackstagePass(15, 20),
  new BackstagePass(10, 49),
  new BackstagePass(5, 49),
  new ConjuredItem("Conjured Mana Cake", 3, 6),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + ", " + element.sellIn + ", " + element.quality);
  });
  console.log();
  gildedRose.updateQuality();
}
