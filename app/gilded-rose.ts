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

  static updateQualityBackstagePass(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return item; // Return as early as possible
    }

    let qualityIncrement = 1;
    if (item.sellIn < 10) qualityIncrement++;
    if (item.sellIn < 5) qualityIncrement++;

    item.quality = GildedRose.incrementQuality(item.quality, qualityIncrement);
    return item;
  }

  static updateQualityAgedBrie(item: Item) {
    const qualityIncrement = item.sellIn < 0 ? 2 : 1;
    item.quality = GildedRose.incrementQuality(item.quality, qualityIncrement);
    return item;
  }

  static updateQualityDefaultItem(item: Item) {
    const qualityDecrement = item.sellIn < 0 ? 2 : 1;
    item.quality = GildedRose.decrementQuality(item.quality, qualityDecrement);
    return item;
  }

  static updateQualityConjuredItem(item: Item) {
    const qualityDecrement = item.sellIn < 0 ? 4 : 2;
    item.quality = GildedRose.decrementQuality(item.quality, qualityDecrement);
    return item;
  }

  static incrementQuality(quality: number, increment: number = 1) {
    return quality === 50 ? quality : quality + increment;
  }

  static decrementQuality(quality: number, decrement: number = 1) {
    return quality - decrement <= 0 ? 0 : quality - decrement;
  }

  updateQuality() {
    this.items = this.items.map((item: Item) => {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }

      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          return item;
        case 'Backstage passes to a TAFKAL80ETC concert':
          return GildedRose.updateQualityBackstagePass(item);
        case 'Aged Brie':
          return GildedRose.updateQualityAgedBrie(item);
        case 'Conjured Mana Cake':
          return GildedRose.updateQualityConjuredItem(item);
        default:
          return GildedRose.updateQualityDefaultItem(item);
      }
    });

    return this.items;
  }
}
