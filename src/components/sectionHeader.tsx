import React, { ReactNode } from 'react';
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
    return (<div className={isSubheader ? 'subSectionHeader' : 'sectionHeader'}>
        <a className="sectionAnchor" id={linkId}></a>
        <h1> 
            {sectionTitle}
        </h1>
        {
            tooltipContent && <Tooltip content={tooltipContent}/>
        }
    </div>)
}

export default SectionHeader;