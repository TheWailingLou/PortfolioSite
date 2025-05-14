const convertValueToDigit = (value: number) => {
    if (value > 9) {
        switch (value) {
            case 10:
                return "A";
            case 11:
                return "B";
            case 12:
                return "C";
            case 13:
                return "D";
            case 14:
                return "E";
            case 15:
                return "F";
            case 16:
                return "G";
            case 17:
                return "H";
            case 18:
                return "I";
            case 19:
                return "J";
            default:
                throw new Error("Does not support digits beyond 19")
        }
    } else {
        return value;
    }
}

const convertNumberToBase = (decimalValue: number, precision=8, base=12) => {
    let num = Math.abs(decimalValue);
    let precisionCalculated = 0;

    const digits: (number | string)[] = [];
    let fraction = num - Math.floor(num)
    num = Math.floor(num);
    
    while(num > 0) {
        const digit = Math.abs(Math.floor(num)) % base;
        num -= digit;
        num /= base;
        const b12digit = convertValueToDigit(digit);
        digits.push(b12digit);
    }

    if (digits.length === 0) {
        digits.push(0);
    }
    
    const fractionDigits = []

    while(precisionCalculated < precision && fraction > 0) {
        let fractionComp = fraction * base;
        const digit = Math.floor(fractionComp) % base;
        precisionCalculated += 1;
        fraction = fractionComp - Math.floor(fractionComp)  ;
        const b12digit = convertValueToDigit(digit);
        fractionDigits.push(b12digit);
    }
    if (fractionDigits.length > 0) {
        fractionDigits.unshift(".");
    }
    return {
        digits: digits.reverse().join("") + fractionDigits.join(""), 
        isNegative: decimalValue < 0,
    };
}

export default convertNumberToBase;
