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

  /**
   * Updates the quality of backpage passes as it gets closer to the gig
   * @function
   * @param {object} item - The product item that needs the quality updated
   */
  static updateQualityBackstagePass(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return item; // Return as early as possible
    }

    let qualityIncrement: number = 1;
    if (item.sellIn < 10) qualityIncrement++;
    if (item.sellIn < 5) qualityIncrement++;

    item.quality = GildedRose.incrementQuality(item.quality, qualityIncrement);
    return item;
  }

  /**
   * Updates the quality of aged brie
   * @function
   * @param {object} item - The product item that needs the quality updated
   */
  static updateQualityAgedBrie(item: Item) {
    const qualityIncrement: number = item.sellIn < 0 ? 2 : 1;
    item.quality = GildedRose.incrementQuality(item.quality, qualityIncrement);
    return item;
  }

  /**
   * Updates the quality of any item without special rules
   * @function
   * @param {object} item - The product item that needs the quality updated
   */
  static updateQualityDefaultItem(item: Item) {
    const qualityDecrement: number = item.sellIn < 0 ? 2 : 1;
    item.quality = GildedRose.decrementQuality(item.quality, qualityDecrement);
    return item;
  }

  /**
   * Updates the quality of a conjured item
   * @function
   * @param {object} item - The product item that needs the quality updated
   */
  static updateQualityConjuredItem(item: Item) {
    const qualityDecrement: number = item.sellIn < 0 ? 4 : 2;
    item.quality = GildedRose.decrementQuality(item.quality, qualityDecrement);
    return item;
  }

  /**
   * Increase the quality value by a provided decrement value while
   * preventing it from increasing above 50
   * @function
   * @param {number} quality - The current quality value
   * @param {number} increment - The ammount to increase quality by
   */
  static incrementQuality(quality: number, increment: number = 1) {
    return quality + increment >= 50 ? 50 : quality + increment;
  }

  /**
   * Reduces the quality value by a provided decrement value while
   * preventing it from dropping below 0
   * @function
   * @param {number} quality - The current quality value
   * @param {number} decrement - The ammount to decrease quality by
   */
  static decrementQuality(quality: number, decrement: number = 1) {
    return quality - decrement <= 0 ? 0 : quality - decrement;
  }

  /**
   * Updates the quality of the items in the Gilded Rose store
   * @function
   */
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
