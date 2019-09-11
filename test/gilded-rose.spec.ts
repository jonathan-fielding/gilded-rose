import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';

describe('Gilded Rose', function () {

    // Test for generic item 'foo'
    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });

    //
    // Test for 'Aged Brie'
    // Every day it gets older Quality increases by 2
    // 
    it('should Aged Brie', function() {
        const agedBrie = new Item('Aged Brie', 0, 0);
        const gildedRose = new GildedRose([ agedBrie ]);
        
        for (let i = 1; i <= 50; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('Aged Brie');

            if (i < 26) {
                expect(items[0].quality).to.equal(i * 2);
                expect(items[0].sellIn).to.equal(i * -1);
            } else {
                expect(items[0].quality).to.equal(50);
                expect(items[0].sellIn).to.equal(i * -1);
            }
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
        const gildedRose = new GildedRose([ backstagePassItem ]);
        
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
        const gildedRose = new GildedRose([ sulfurasItem ]);
        
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(sulfuras);
        expect(items[0].quality).to.equal(80);

        const items2 = gildedRose.updateQuality();
        expect(items2[0].name).to.equal(sulfuras);
        expect(items2[0].quality).to.equal(80);
    });
});
