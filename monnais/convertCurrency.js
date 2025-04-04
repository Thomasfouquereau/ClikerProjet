export function convertCurrencyAll(copper, silver, gold, platinum) {
    if (copper >= 10000) {
        silver += Math.floor(copper / 10000);
        copper = copper % 10000;
    }
    if (silver >= 10000) {
        gold += Math.floor(silver / 10000);
        silver = silver % 10000;
    }
    if (gold >= 10000) {
        platinum += Math.floor(gold / 10000);
        gold = gold % 10000;
    }
    return { copper, silver, gold, platinum };
}

