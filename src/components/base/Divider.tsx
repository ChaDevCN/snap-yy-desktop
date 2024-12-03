import React from 'react';
import { Divider as DividerComponents } from 'antd';

interface DividerProps {
    borderColor?: string
    title?: string
    children?: React.ReactNode
}
const Divider: React.FC<DividerProps> = ({ borderColor = '#7cb305', title, children }) => {
    return (
        <DividerComponents style={{ borderColor }}>
            {title && <h2 className='font-semibold text-2xl'>{title}</h2>}
            {children}
        </DividerComponents>
    )
}
export { Divider } 