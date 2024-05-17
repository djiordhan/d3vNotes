import { createContext, useContext, ReactNode } from 'react';
import useMarkdownManager, { MarkdownManagerHook } from './hooks';

const MarkdownManagerContext = createContext<MarkdownManagerHook | undefined>(undefined);

export const MarkdownManagerProvider = ({ children }: { children: ReactNode }) => {
    const markdownManager = useMarkdownManager();
    return (
        <MarkdownManagerContext.Provider value={markdownManager}>
            {children}
        </MarkdownManagerContext.Provider>
    );
};

export const useMarkdownManagerContext = () => {
    const context = useContext(MarkdownManagerContext);
    if (!context) {
        throw new Error('useMarkdownManagerContext must be used within a MarkdownManagerProvider');
    }
    return context;
};