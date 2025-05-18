import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Tooltip from './tooltip';

import './sectionHeader.scss';

const SectionHeader: React.FC<{
    sectionTitle: string,
    linkId: string,
    isSubheader?: boolean,
    tooltipContent?: ReactNode | string
}> = ({
    sectionTitle,
    linkId,
    isSubheader = false,
    tooltipContent
}) => {
    const [viewPortWidth, setViewportWidth] = useState(window.visualViewport?.width || 0);
    useLayoutEffect(() => {
        const eventName = 'resize';
        const listener = () => setViewportWidth(window.visualViewport?.width || 0)
        window.addEventListener(eventName, listener)
        return () => window.removeEventListener(eventName, listener);
    }, [])
    
    return (<div className={isSubheader ? 'subSectionHeader' : 'sectionHeader'}>
        <a className="sectionAnchor" id={linkId}></a>
        <h1> 
            {sectionTitle}
        </h1>
        {
            tooltipContent && <Tooltip content={tooltipContent} location={viewPortWidth < 776 ? 'LEFT' :'RIGHT'}/>
        }
    </div>)
}

export default SectionHeader;