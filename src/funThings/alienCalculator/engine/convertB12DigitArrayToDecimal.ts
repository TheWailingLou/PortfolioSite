const convertB12DigitArrayToDecimal = (b12DigitArray: (string | number)[]) => {
    let decimalPoint = -1;
    const integerPortion = b12DigitArray.filter((el, i) => {
        if (el === "." ) {
            decimalPoint = i;
            return false;
        }
        return decimalPoint === -1
    });
    const integerAsDecimal = (integerPortion as number[]).reverse().reduce((acc, num, i) => {
        const toAdd = num * Math.pow(12, i);
        acc += toAdd;
        return acc;
    }, 0)
    let fractionPortion: number[] = [];
    if (decimalPoint !== -1) {
        fractionPortion = b12DigitArray.filter((el, i) => {
            return i > decimalPoint && typeof el === 'number';
        }) as number[];
    }

    const fractionAsDecimal = fractionPortion.reduce((acc, num, i) => {
        const toAdd = num / Math.pow(12, (i + 1));
        acc += toAdd;
        return acc;
    }, 0);
    const result = integerAsDecimal + fractionAsDecimal;
    return result;
}

export default convertB12DigitArrayToDecimal;