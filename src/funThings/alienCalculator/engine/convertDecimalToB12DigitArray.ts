import { cloneDeep } from "lodash";
import convertNumberToBase from "./convertNumberToBase";

const convertToDecimalToB12DigitArray = (decimal: number) => {
    const asB12 = convertNumberToBase(decimal);
    const asBalB12Array = convertBase12BalB12(asB12);
    return asBalB12Array;
}

const convertBase12BalB12 = ({ digits, isNegative }: { digits: string, isNegative: boolean }) => {
    const sign = isNegative ? -1 : 1;
    let digitPoint = -1;
    const asArray = digits.toString().split("").filter((dig, i) => {
        if (dig === ".") {
            digitPoint = i;
            return false;
        }
        return true;
    });
    
    const asTwoBits: [number, number, boolean | undefined][] = asArray.map((dig, i) => {
        let asNum = parseInt(dig);

        if (isNaN(asNum)) {
            if (dig === 'A') {
                asNum = 10;
            }
            if (dig === 'B') {
                asNum = 11;
            }
        }
        const isDigitPoint = digitPoint === i;
        if (asNum < 6 || (!isNegative && asNum === 6)) {
            return [0 * sign, asNum * sign, isDigitPoint];
        } else {
            return [1 * sign, (asNum - 12) * sign, isDigitPoint];
        }
    });

    const asFlattenedTwoBits = flattenTwoBits(asTwoBits);
    const asSingleDigit = asFlattenedTwoBits.reduce((acc: (string | number)[], tb: [number, number, boolean | undefined]) => {
        if (tb[2]) {
            acc.push(".");
        }
        acc.push(tb[1]);
        
        return acc;
    }, []);
    return asSingleDigit;
} 

const flattenTwoBits = (twoBitArray: [number, number, boolean | undefined][]) => {
    let flattened = cloneDeep(twoBitArray);
    let needsFirstDigitFlatten = false;
    while(isTwoBitJagged(flattened) && !needsFirstDigitFlatten) {
        flattened.forEach((tb, i) => {
            if (tb[0] != 0) {
                if (i > 0) {
                    flattened[i - 1][1] += tb[0];
                    flattened[i][0] = 0;
                } else {
                    needsFirstDigitFlatten = true;
                }
            }
            if (tb[1] > 6) {
                flattened[i][1] -= 12;
                flattened[i][0] += 1;
            }
            if (tb[1] < -5) {
                flattened[i][1] += 12;
                flattened[i][0] -= 1;
            }
        })
    }
    if (needsFirstDigitFlatten) {
        flattened.unshift([0, 0, undefined]);
        return flattenTwoBits(flattened);
    }
    return flattened;
}

const isTwoBitJagged = (twoBitArray: [number, number, boolean | undefined][]) => {
    if (twoBitArray.length === 1) {
        if (twoBitArray[0][0] === 0 && twoBitArray[0][1] === 0) {
            return false;
        }
    }
    return twoBitArray.filter(tb => {
        if (tb[0] !== 0 || tb[1] > 6 || tb[1] < -5) {
            return true;
        }
        return false;
    }).length > 0;
}

export default convertToDecimalToB12DigitArray;