import { cloneDeep } from "lodash";
import React, { useState } from "react";
import BalB12Display from "./balB12Display";
import eq from './symbols/eq.png';

import './decimalConverter.css';
import convertToDecimalToB12DigitArray from "./engine/convertDecimalToB12DigitArray";
import convertNumberToBase from "./engine/convertNumberToBase";
import Tooltip from "../../components/tooltip";

const DecimalConverter = () => {
    const [decimalBalance, setDecimalBalance] = useState<number | undefined>(0);

    const maxValue = 100000000
    const minValue = -maxValue;

    const setBalance = (balance: number) => {
        if (isNaN(balance)) {
            setDecimalBalance(undefined);
        }
        if (balance <= maxValue && balance >= minValue) {
            setDecimalBalance(balance);
        }
    }

    return (
        <div className="decimalConverterWrapper">
            <div className="base10Input">
                <input value={decimalBalance} onChange={e => setBalance(parseInt(e.target.value))} max={maxValue} type="number"/>
                <div className="baseAndTip">
                    <div className="tooltipContainer">
                        <Tooltip content={
                            <div className="tooltipText">
                                Enter a normal base 10 number here to see it's equivalent in balanced base 12. Try entering a negative value!
                            </div>
                        }/>
                    </div>
                    <div className="numberBaseSubscript">
                        <div className="numberBaseActual">10</div>
                    </div>
                </div>
                
            </div>
            
            <img className="equalSign" src={eq} />
            <div className="base12Input">
                <BalB12Display digitArray={convertToDecimalToB12DigitArray(decimalBalance || 0)}/>
                <div className="baseAndTip">
                    <div className="tooltipContainer">
                        <Tooltip content={
                            <div className="tooltipText">
                                This is the balanced base 12 equivalent of the number on the right.  
                            </div>
                        }/>
                    </div>
                    <div className="numberBaseSubscript">
                        <div className="plusMinus"><div>+</div><div>-</div></div>
                        <div className="numberBaseActual">12</div>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default DecimalConverter;