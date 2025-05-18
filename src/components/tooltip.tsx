import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './tooltip.scss';
import TOOLTIP_LOCATION from './tooltipLocation';

const Tooltip: React.FC<{
    content: ReactNode | string
    location?: keyof typeof TOOLTIP_LOCATION,
}> = ({
    content,
    location = TOOLTIP_LOCATION.BELOW
})  => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [holdShowTooltip, setHoldShowTooltip] = useState(false);

    const tooltipRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<{
        top: string,
        left?: string,
        right?: string,
    }>({
        top: '10px',
        // left: '10px',
    })

    const handleMouseEnter = () => {
        if (tooltipRef.current) {
            const position = tooltipRef.current.getBoundingClientRect();
            if (location === TOOLTIP_LOCATION.RIGHT) {
                setPosition({
                    top: `${window.scrollY + position.top}px`,
                    left: `${position.left + 30}px`,
                })
            }
            // console.log(position.right, position.left, window.visualViewport?.width);
            if (location === TOOLTIP_LOCATION.LEFT) {
                setPosition({
                    top: `${window.scrollY + position.top}px`,
                    right: `${(window.visualViewport?.width || 0) - (position.right - 30)}px`,
                })
            }
            
            if (location === TOOLTIP_LOCATION.BELOW) {
                setPosition({
                    top: `${window.scrollY + position.top + 30}px`,
                    right: `${(window.visualViewport?.width || 0) - (position.right + 30)}px`,
                })
            }

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