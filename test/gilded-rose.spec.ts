import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

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
    // Every day it gets older Quality increases by q
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
});
