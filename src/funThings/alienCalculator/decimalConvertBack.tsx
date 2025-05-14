import { cloneDeep, min } from 'lodash';
import React, { useState } from 'react';
import BalB12DigitSelector from './balB12DigitSelector';
import BalB12Display from './balB12Display';
import OPERATION from './operation';

import eq from './symbols/eq.png';
import minus from './symbols/minus.png';
import plus from './symbols/plus.png';
import multiply from './symbols/multiply.png';
import divide from './symbols/divide.png';

import './decimalConvertBack.css';
import convertB12DigitArrayToDecimal from './engine/convertB12DigitArrayToDecimal';
import convertToDecimalToB12DigitArray from './engine/convertDecimalToB12DigitArray';

const DecimalConvertBack = ({ }) => {
    const [operand, setOperand] = useState<(string | number)[]>([]);
    const [modificationQuantity, setModificationQuantity] = useState<(number | string)[]>([]);
    const [operation, setOperation] = useState<null | keyof typeof OPERATION>();
    const [operationValue, setOperationValue] = useState<(string | number)[]>([]);
    const [operationChanged, setOperationChanged] = useState(false);


    const calculate = () => {
        const asDecimalOp = convertB12DigitArrayToDecimal(operand);
        const asDecimalMod = convertB12DigitArrayToDecimal(modificationQuantity);
        let newValue;
        switch(operation) {
            case OPERATION.MULTIPLY:
                newValue = convertToDecimalToB12DigitArray(asDecimalOp * asDecimalMod);
                break;
            case OPERATION.DIVIDE:
                newValue = convertToDecimalToB12DigitArray(asDecimalOp / asDecimalMod);
                break;
            case OPERATION.ADD:
                newValue = convertToDecimalToB12DigitArray(asDecimalOp + asDecimalMod);
                break;
            case OPERATION.SUBTRACT:
                newValue = convertToDecimalToB12DigitArray(asDecimalOp - asDecimalMod);
                break
        };
        if (!newValue) {
            return [];
        }
        return newValue;
    }


    const handleOperandShortcut = () => {
        if (operand.length === 0) {
            setOperand([0]);
        }
        if (operationValue.length > 0) {
            setOperand(cloneDeep(operationValue));
        }
        // if (calculate())
        
    }
    
    const selectDigit = (selection: number | string) => {
        switch (selection)  {
            case OPERATION.ADD:
                handleOperandShortcut();
                setOperation(OPERATION.ADD);
                break;
            case OPERATION.SUBTRACT:
                handleOperandShortcut();
                setOperation(OPERATION.SUBTRACT);
                break;
            case OPERATION.MULTIPLY:
                handleOperandShortcut();
                setOperation(OPERATION.MULTIPLY);
                break;
            case OPERATION.DIVIDE:
                handleOperandShortcut();
                setOperation(OPERATION.DIVIDE);
                break;
            case OPERATION.EQUALS:
                const newValue = calculate();
                setOperationValue(newValue);
                // todo, handle equaling
                break;
            case OPERATION.CLEAR:
                setOperand([]);
                setModificationQuantity([]);
                setOperationValue([])
                setOperation(null);
                break;
            default:
                if (operation) {
                    const newModificationQuantity = cloneDeep(modificationQuantity);
                    newModificationQuantity.push(selection);
                    setModificationQuantity(newModificationQuantity);
                } else {
                    const newOperand = cloneDeep(operand);
                    newOperand.push(selection);
                    setOperand(newOperand);
                }
                
        }

    }
    const renderOperator = () => {
        switch (operation) {
            case OPERATION.MULTIPLY:
                return <img src={multiply} />
            case OPERATION.DIVIDE:
                return <img src={divide} />
            case OPERATION.ADD:
                return <img src={plus} />
            case OPERATION.SUBTRACT:
                return <img src={minus} />
            default: 
                return <div></div>
        }
    }
    return (
        <div>
            <BalB12DigitSelector handleSelectDigit={selectDigit}/>
            <div className='operationBox'>
                <div className='operandBox'>
                    <div className="operandNumberBox">
                        <BalB12Display digitArray={operand}/>
                        <BalB12Display digitArray={modificationQuantity}/>
                    </div>
                    <div className='operator'>
                        {renderOperator() }
                    </div>
                </div>
                <div className='resultBox'>
                    <div className="resultValueBox">
                        <BalB12Display digitArray={operationValue}/>
                    </div>
                    <div className='placeholderBox'></div>
                </div>
                
            </div>
            

        </div>
    )
}

export default DecimalConvertBack;