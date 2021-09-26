import React from 'react'
import {Spacing} from '@ds.e/foundation'

interface MarginProps{
    space?: keyof typeof Spacing,
    top?: boolean,
    right?: boolean,
    left?: boolean,
    bottom?: boolean,
}

const Margin: React.FC<MarginProps> = ({space = 'xl', children, top, right, left, bottom}) => {
    let className = `dse-margin-${space}`
    if(top){
        className = `${className} dse-margin-top-${space}`
    }

    if(right){
        className = `${className} dse-margin-right-${space}`
    }

    if(left){
        className = `${className} dse-margin-left-${space}`
    }

    if(bottom){
        className = `${className} dse-margin-bottom-${space}`
    }
    
    return <div className={className}>{children}</div>
}

export default Margin;