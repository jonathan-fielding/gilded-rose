import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';

describe('Gilded Rose', function() {
  // Test for no items being added to gilded rose
  it('should have no items in an empty shop', function() {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  // Test for generic item 'foo'
  it('should foo', function() {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });

  // Test for generic item 'bar'
  // Quality degrades by 1 per day while sellIn is greater than 0
  // Once its past its sell by date quality degrades by 2
  it('should bar', function() {
    const gildedRose = new GildedRose([new Item('bar', 5, 15)]);
    let days = 5;
    let expectedQuality = 15;

    while (days > 0) {
      const items = gildedRose.updateQuality();
      expectedQuality--;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    while (days > -5) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality - 2;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    const updateAgain = gildedRose.updateQuality();
    expect(updateAgain[0].quality).to.equal(0);
  });

  //
  // Test for 'Aged Brie'
  // Every day it gets older Quality increases by 2
  //
  it('should Aged Brie', function() {
    const agedBrie = new Item('Aged Brie', 5, 0);
    const gildedRose = new GildedRose([agedBrie]);

    let days = 5;
    let expectedQuality = 0;

    while (days > 0) {
      const items = gildedRose.updateQuality();
      expectedQuality++;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    while (days > -25) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality + 2;

      if (expectedQuality > 50) {
        expectedQuality = 50;
      }

      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }
  });

  //
  // Test for 'Backstage passes to a TAFKAL80ETC concert'
  // Quality goes up by 1 each day when the Sellin is greater than 10.
  // Quality increases by 2 when there are 10 days or less
  // Quality increases by 3 when there are 5 days or less
  // Quality drops to 0 after the concert.
  //
  it('should Backstage passes quality increases', function() {
    const backstagePassItem = new Item(backstagePass, 15, 1);
    const gildedRose = new GildedRose([backstagePassItem]);

    let days = 15;
    let expectedQuality = 1;

    while (days > 10) {
      const items = gildedRose.updateQuality();
      expectedQuality++;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    while (days > 5) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality + 2;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    while (days > 0) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality + 3;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    const updateAgain = gildedRose.updateQuality();
    expect(updateAgain[0].name).to.equal(backstagePass);
    expect(updateAgain[0].quality).to.equal(0);
  });

  //
  // Test for 'Sulfuras, Hand of Ragnaros'
  // Every day it gets older Quality increases by 2
  //
  it('should Sulfuras, Hand of Ragnaros always be quality 80', function() {
    const sulfurasItem = new Item(sulfuras, 1, 80);
    const gildedRose = new GildedRose([sulfurasItem]);

    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(sulfuras);
    expect(items[0].quality).to.equal(80);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].name).to.equal(sulfuras);
    expect(items2[0].quality).to.equal(80);
  });

  // Test for 'Conjured Mana Cake'
  // Quality degrades by 2 per day while sellIn is greater than 0
  // Once its past its sell by date quality degrades by 4
  it('should Conjured Mana Cake', function() {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 16)]);
    let days = 5;
    let expectedQuality = 16;

    while (days > 0) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality - 2;
      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }

    while (days > -5) {
      const items = gildedRose.updateQuality();
      expectedQuality = expectedQuality - 4;

      if (expectedQuality < 0) {
        expectedQuality = 0;
      }

      expect(items[0].quality).to.equal(expectedQuality);
      days--;
    }
  });

  // Test for incrementQuality
  // quality should be incremented until it reaches a cap of 50
  it('should incrementQuality', function() {
    const increment0by1 = GildedRose.incrementQuality(0, 1);
    expect(increment0by1).to.equal(1);

    const increment1by2 = GildedRose.incrementQuality(1, 2);
    expect(increment1by2).to.equal(3);
    
    const increment49by2 = GildedRose.incrementQuality(49, 2);
    expect(increment49by2).to.equal(50);

    const increment50by1 = GildedRose.incrementQuality(50, 1);
    expect(increment50by1).to.equal(50);
  });

  // Test for decrementQuality
  // quality should be incremented until it reaches a cap of 50
  it('should decrementQuality', function() {
    const decrement0by1 = GildedRose.decrementQuality(0, 1);
    expect(decrement0by1).to.equal(0);

    const decrement1by2 = GildedRose.decrementQuality(1, 2);
    expect(decrement1by2).to.equal(0);
    
    const decrement49by2 = GildedRose.decrementQuality(49, 2);
    expect(decrement49by2).to.equal(47);

    const decrement50by1 = GildedRose.decrementQuality(50, 1);
    expect(decrement50by1).to.equal(49);
  });
});
