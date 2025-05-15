import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './tooltip.scss';

const Tooltip: React.FC<{
    content: ReactNode | string
}> = ({
    content
})  => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [holdShowTooltip, setHoldShowTooltip] = useState(false);

    const tooltipRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({
        top: '10px',
        left: '10px',
    })

    const handleMouseEnter = () => {
        if (tooltipRef.current) {
            const position = tooltipRef.current.getBoundingClientRect();
            setPosition({
                top: `${window.scrollY + position.top}px`,
                left: `${position.left + 30}px`,
            })

            setShowTooltip(true);
        }
    }

    return (<div className='tooltipIcon' ref={tooltipRef}> 
        <FontAwesomeIcon icon={faQuestion} onMouseEnter={handleMouseEnter} onMouseLeave={() => {
            setShowTooltip(holdShowTooltip)
        }} onClick={() => setHoldShowTooltip(!holdShowTooltip)}/>
        {showTooltip && <div 
            className='tooltipBox'
            style={{...position}}
        >
            {content}
        </div>}
    </div>)
}

export default Tooltip;