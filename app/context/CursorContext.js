'use client';
import { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
    cursorType: 'default',
    setCursorType: () => { },
});

export const CursorProvider = ({ children }) => {
    const [cursorType, setCursorType] = useState('default'); // 'default' | 'magnetic' | 'jelly'

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);
