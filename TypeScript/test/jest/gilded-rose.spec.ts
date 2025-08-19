import { GildedRose } from "../../app/gilded-rose";
import { AgedBrie } from "../../app/types/aged-brie";
import { BackstagePass } from "../../app/types/backstage-pass";
import { ConjuredItem } from "../../app/types/conjured-items";
import { StandardItem } from "../../app/types/standard-item";
import { Sulfuras } from "../../app/types/sulfuras";

describe("Gilded Rose", () => {
  describe("Standard Items Quality Update", () => {
    it("should be named standard foo, quality decreasing by 1, sellIn decreases by 1", () => {
      const gildedRose = new GildedRose([
        new StandardItem("standard foo", 10, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("standard foo");
      expect(items[0].quality).toBe(9);
      expect(items[0].sellIn).toBe(9);
    });

    it("should keep quality at 0, decrease sellIn by 1", () => {
      const gildedRose = new GildedRose([
        new StandardItem("standard foo", 10, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(9);
    });

    it("should degrade quality twice as fast when sellIn < 0", () => {
      const gildedRose = new GildedRose([
        new StandardItem("standard foo", 0, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
      expect(items[0].sellIn).toBe(-1);
    });
  });

  describe("Aged Brie Quality Update", () => {
    it("should be named Aged Brie, quality increases, sellIn decreases", () => {
      const gildedRose = new GildedRose([new AgedBrie(2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].quality).toBe(1);
      expect(items[0].sellIn).toBe(1);
    });

    it("should be named Aged Brie, quality at max 50, sellIn decreases", () => {
      const gildedRose = new GildedRose([new AgedBrie(2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].quality).toBe(50);
      expect(items[0].sellIn).toBe(1);
    });
  });

  describe("Sulfuras Quality Update", () => {
    it("should be named Sulfuras, quality stays at 80, sellIn stays the same", () => {
      const gildedRose = new GildedRose([new Sulfuras(0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(0);
    });
  });

  describe("Backstage Passes Quality Update", () => {
    it("should be named Backstage passes, being valid, quality increases, sellIn decreases", () => {
      const gildedRose = new GildedRose([new BackstagePass(15, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(21);
      expect(items[0].sellIn).toBe(14);
    });

    it("should be named Backstage passes, being valid, quality increases by 2 (10 days before), sellIn decreases", () => {
      const gildedRose = new GildedRose([new BackstagePass(10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(22);
      expect(items[0].sellIn).toBe(9);
    });

    it("should be named Backstage passes, being valid, quality increases by 3 (5 days before), sellIn decreases", () => {
      const gildedRose = new GildedRose([new BackstagePass(5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(23);
      expect(items[0].sellIn).toBe(4);
    });

    it("should be named Backstage passes, being valid, reaches maximum quality, sellIn decreases", () => {
      const gildedRose = new GildedRose([new BackstagePass(5, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(50);
      expect(items[0].sellIn).toBe(4);
    });

    it("should be named Backstage passes, expiring, quality drops to 0, sellIn decreases", () => {
      const gildedRose = new GildedRose([new BackstagePass(0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-1);
    });
  });

  describe("Conjured Items Quality Update", () => {
    it("should be named Conjured Mana Cake, quality decreases by 2, sellIn decreases by 1", () => {
      const gildedRose = new GildedRose([
        new ConjuredItem("Conjured Mana Cake", 3, 6),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Conjured Mana Cake");
      expect(items[0].quality).toBe(4);
      expect(items[0].sellIn).toBe(2);
    });

    it("should be named Conjured Mana Cake, quality at minimum 0, sellIn decreases by 1", () => {
      const gildedRose = new GildedRose([
        new ConjuredItem("Conjured Mana Cake", 3, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Conjured Mana Cake");
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(2);
    });

    it("should be named Conjured Mana Cake, quality decreases by 4 when sellIn < 0", () => {
      const gildedRose = new GildedRose([
        new ConjuredItem("Conjured Mana Cake", 0, 6),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Conjured Mana Cake");
      expect(items[0].quality).toBe(2);
      expect(items[0].sellIn).toBe(-1);
    });
  });
});
