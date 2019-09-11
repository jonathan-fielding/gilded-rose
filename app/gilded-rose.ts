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

  static updateQualityBackstagePass(item) {
    item.quality = item.quality + 1;

    if (item.sellIn < 10) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    if (item.sellIn < 5) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    if (item.sellIn < 0) {
      item.quality = 0;
    }
    
    return item;
  }

  static updateQualityAgedBrie(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    if (item.sellIn < 0) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    return item;
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
          return GildedRose.updateQualityBackstagePass(item)
        case 'Aged Brie':
          return GildedRose.updateQualityAgedBrie(item)
        default:
          break;
      }

 
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
      
      if (item.sellIn < 0) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }

      return item;
    });

    return this.items;
  }
}
