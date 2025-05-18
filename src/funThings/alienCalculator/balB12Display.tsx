import React from "react";
import min5 from './symbols/-5.png';
import min4 from './symbols/-4.png';
import min3 from './symbols/-3.png';
import min2 from './symbols/-2.png';
import min1 from './symbols/-1.png';

import zero from './symbols/0.png';

import pos1 from './symbols/1.png';
import pos2 from './symbols/2.png';
import pos3 from './symbols/3.png';
import pos4 from './symbols/4.png';
import pos5 from './symbols/5.png';

import six from './symbols/6.png';

import decPoint from './symbols/decPoint.png'

import './balB12Display.css';

const BalB12Display = ({ digitArray }: { digitArray: (number | string)[] }) => {
    
    const renderDigits = () => {
        const asImgs = digitArray.map(digit => {
            switch (digit) {
                case -5:
                    return min5;
                case -4:
                    return min4;
                case -3:
                    return min3;
                case -2:
                    return min2;
                case -1: 
                    return min1;
                case 0:
                    return zero;
                case 1: 
                    return pos1;
                case 2: 
                    return pos2;
                case 3:
                    return pos3;
                case 4:
                    return pos4;
                case 5:
                    return pos5;
                case 6:
                    return six;
                case ".":
                    return decPoint;
            }
        })

        return asImgs.map((im:string, i:number) => (
            <img className="displayDigit" src={im} key={`imageDisplay-${i}`}/>
        ))
    }

    return (<div className="b12DisplayWrapper">
        {renderDigits()}
    </div>)
}
export default BalB12Display;