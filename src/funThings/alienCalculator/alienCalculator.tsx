import React from 'react';

import DecimalConverter from './decimalConverter';
import DecimalConvertBack from './decimalConvertBack';
import './alienCalculator.scss';
import Tooltip from '../../components/tooltip';

const AlienCalculator = () => {
    return (
      <div className={'alienCalculatorWrapper'} >
        <div className='alienCalculatorHeader'>
            <h2>Alien Calculator</h2>
            <Tooltip content={
              <div className='tooltipText'>
                This is a <a href="https://en.wikipedia.org/wiki/Duodecimal">base 12</a> calculator with a twist. It's <a href="https://en.wikipedia.org/wiki/Balanced_ternary" target="blank">balanced</a> base 12 instead of normal duodecimal, meaning some digits are negative. 
              </div>
            }/>
        </div>
        <div className='alienCalculator'>
          <DecimalConverter />
          <DecimalConvertBack />
        </div>

      </div>
    )
}

export default AlienCalculator;