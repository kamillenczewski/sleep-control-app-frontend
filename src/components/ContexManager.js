import { createContext, useContext, useMemo } from 'react';

export const ContextManagerContext = createContext();

function composeContexts(contexts, children) {
  return contexts.reduceRight((structure, ContextComponent) => {
    return <ContextComponent>{structure}</ContextComponent>;
  }, children);
}

export const ContextManager = ({ contexts, children }) => {
  if (!contexts) {
    contexts = [];
  }

  const composedTree = useMemo(() => composeContexts(contexts, children), [contexts, children]);

  return (
    <ContextManagerContext.Provider value={{ contexts }}>
      {composedTree}
    </ContextManagerContext.Provider>
  );
};

export const useContextManager = () => useContext(ContextManagerContext);
