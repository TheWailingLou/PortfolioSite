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
import eq from './symbols/eq.png';
import minus from './symbols/minus.png';
import plus from './symbols/plus.png';
import multiply from './symbols/multiply.png';
import divide from './symbols/divide.png';

import './balB12DigitSelector.css';
import OPERATION from "./operation";

const BalB12DigitSelector: React.FC<{
    handleSelectDigit: (digit: number | string) => void 
}> = ({ 
    handleSelectDigit
}) => {
    return (
        <div className="digitSelector">
            
            <div className="operationButtons">
            
                <div className="digitSelectorColumn">
                    <img className="digitSelectorButton clearButton" src={zero} onClick={() => handleSelectDigit(OPERATION.CLEAR)}/>
                    <img className="digitSelectorButton" src={eq} onClick={() => handleSelectDigit(OPERATION.EQUALS)}/>
                </div>
                <div className="digitSelectorColumn">
                    <img className="digitSelectorButton" src={minus} onClick={() => handleSelectDigit(OPERATION.SUBTRACT)}/>
                    <img className="digitSelectorButton" src={plus} onClick={() => handleSelectDigit(OPERATION.ADD)}/>
                </div>
                <div className="digitSelectorColumn">
                    <img className="digitSelectorButton" src={divide} onClick={() => handleSelectDigit(OPERATION.DIVIDE)}/>
                    <img className="digitSelectorButton" src={multiply} onClick={() => handleSelectDigit(OPERATION.MULTIPLY)}/>
                </div>
                <div className="digitSelectorColumn">
                    <div className="placeholderSelectorButton"/>
                    <img className="digitSelectorButton" src={decPoint} onClick={() => handleSelectDigit(".")}/>
                </div>
            </div>

            <div className='digitSelection'>
                <div className="digitSelectorColumn zeroSixSelector">
                    <img className="digitSelectorButton" src={zero} onClick={() => handleSelectDigit(0)}/>
                    <img className="digitSelectorButton" src={six} onClick={() => handleSelectDigit(6)}/>
                </div>
                <div className="digitSelectorColumn">
                    <div className="digitSelectorRow">
                        <img className="digitSelectorButton" src={pos4} onClick={() => handleSelectDigit(4)}/>
                        <img className="digitSelectorButton" src={pos5} onClick={() => handleSelectDigit(5)}/>
                    </div>
                    <div className="digitSelectorRow">
                        <img className="digitSelectorButton" src={pos1} onClick={() => handleSelectDigit(1)}/>
                        <img className="digitSelectorButton" src={pos2} onClick={() => handleSelectDigit(2)}/>
                        <img className="digitSelectorButton" src={pos3} onClick={() => handleSelectDigit(3)}/>
                    </div>
                    <div className="digitSelectorRow"> 
                        <img className="digitSelectorButton" src={min1} onClick={() => handleSelectDigit(-1)}/>
                        <img className="digitSelectorButton" src={min2} onClick={() => handleSelectDigit(-2)}/>
                        <img className="digitSelectorButton" src={min3} onClick={() => handleSelectDigit(-3)}/>
                    </div>
                    <div className="digitSelectorRow">
                        <img className="digitSelectorButton" src={min4} onClick={() => handleSelectDigit(-4)}/>
                        <img className="digitSelectorButton" src={min5} onClick={() => handleSelectDigit(-5)}/>  
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default BalB12DigitSelector;