import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, EmailTemplate, EmailElement, LayoutElement, ThemeColor } from '../types';
import { generateId } from '../utils/helpers';

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>;
  addElement: (element: EmailElement | LayoutElement, parentId?: string) => void;
  addElementAtIndex: (element: EmailElement | LayoutElement, index: number) => void;
  updateTemplate: (updates: Partial<EmailTemplate>) => void;
  updateElement: (elementId: string, updates: Partial<EmailElement | LayoutElement>) => void;
  deleteElement: (elementId: string) => void;
  selectElement: (element: EmailElement | LayoutElement | null) => void;
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  setTheme: (theme: ThemeColor) => void;
  toggleDarkMode: () => void;
  saveTemplate: () => void;
  loadTemplate: (template: EmailTemplate) => void;
  clearTemplate: () => void;
  undo: () => void;
  redo: () => void;
  duplicateElement: (elementId: string) => void;
  moveElement: (elementId: string, direction: 'up' | 'down') => void;
  addElementToColumn: (rowId: string, columnIndex: number, element: EmailElement | LayoutElement) => void;
  moveElementToIndex: (elementId: string, newIndex: number) => void;
  moveElementToColumn: (elementId: string, rowId: string, columnIndex: number) => void;
}

type AppAction = 
  | { type: 'SET_TEMPLATE'; payload: EmailTemplate }
  | { type: 'SELECT_ELEMENT'; payload: EmailElement | LayoutElement | null }
  | { type: 'SET_VIEW_MODE'; payload: 'desktop' | 'mobile' }
  | { type: 'SET_THEME'; payload: ThemeColor }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_TO_HISTORY'; payload: EmailTemplate }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> };

const initialTemplate: EmailTemplate = {
  id: generateId(),
  name: 'Untitled Template',
  elements: [],
  theme: 'purple',
  bodyBackgroundColor: '#ffffff',
  createdAt: new Date(),
  updatedAt: new Date()
};

const initialState: AppState = {
  currentTemplate: initialTemplate,
  selectedElement: null,
  viewMode: 'desktop',
  theme: 'purple',
  darkMode: false,
  history: [initialTemplate],
  historyIndex: 0
};

const AppContext = createContext<AppContextType | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return { ...state, currentTemplate: action.payload, theme: action.payload.theme };
    case 'SELECT_ELEMENT':
      return { ...state, selectedElement: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'ADD_TO_HISTORY': {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      return { 
        ...state, 
        history: newHistory.slice(-50), // Keep last 50 states
        historyIndex: newHistory.length - 1 
      };
    }
    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          currentTemplate: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1
        };
      }
      return state;
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          currentTemplate: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1
        };
      }
      return state;
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('email-builder-state');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        if (parsedState.currentTemplate) {
          parsedState.currentTemplate.createdAt = new Date(parsedState.currentTemplate.createdAt);
          parsedState.currentTemplate.updatedAt = new Date(parsedState.currentTemplate.updatedAt);
        }
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    const stateToSave = {
      currentTemplate: state.currentTemplate,
      theme: state.theme,
      darkMode: state.darkMode,
      viewMode: state.viewMode
    };
    localStorage.setItem('email-builder-state', JSON.stringify(stateToSave));
  }, [state.currentTemplate, state.theme, state.darkMode, state.viewMode]);

  const findElementById = (elements: (EmailElement | LayoutElement)[], id: string): EmailElement | LayoutElement | null => {
    for (const element of elements) {
      if (element.id === id) return element;
      if ('children' in element && element.children) {
        const found = findElementById(element.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const addElement = (element: EmailElement | LayoutElement, parentId?: string) => {
    if (!state.currentTemplate) return;

    const newElement = { ...element, id: generateId() };
    let updatedElements = [...state.currentTemplate.elements];

    if (parentId) {
      const updateElementsRecursively = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
        return elements.map(el => {
          if (el.id === parentId && 'children' in el) {
            return { ...el, children: [...el.children, newElement] };
          } else if ('children' in el) {
            return { ...el, children: updateElementsRecursively(el.children) };
          }
          return el;
        });
      };
      updatedElements = updateElementsRecursively(updatedElements);
    } else {
      updatedElements.push(newElement);
    }

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updatedElements,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
  };

  const addElementAtIndex = (element: EmailElement | LayoutElement, index: number) => {
    if (!state.currentTemplate) return;

    const newElement = { ...element, id: generateId() };
    const updatedElements = [...state.currentTemplate.elements];
    updatedElements.splice(index, 0, newElement);

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updatedElements,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
  };

  const updateTemplate = (updates: Partial<EmailTemplate>) => {
    if (!state.currentTemplate) return;

    const updatedTemplate: EmailTemplate = {
      ...state.currentTemplate,
      ...updates,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
  };

  const updateElement = (elementId: string, updates: Partial<EmailElement | LayoutElement>) => {
    if (!state.currentTemplate) return;

    const updateElementsRecursively = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
      return elements.map(el => {
        if (el.id === elementId) {
          return { ...el, ...updates };
        } else if ('children' in el) {
          return { ...el, children: updateElementsRecursively(el.children) };
        }
        return el;
      }) as (EmailElement | LayoutElement)[];
    };

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updateElementsRecursively(state.currentTemplate.elements),
      updatedAt: new Date()
    };

    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
  };

  const deleteElement = (elementId: string) => {
    if (!state.currentTemplate) return;

    const removeElementRecursively = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
      return elements.filter(el => el.id !== elementId).map(el => {
        if ('children' in el) {
          return { ...el, children: removeElementRecursively(el.children) };
        }
        return el;
      });
    };

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: removeElementRecursively(state.currentTemplate.elements),
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
    
    if (state.selectedElement?.id === elementId) {
      dispatch({ type: 'SELECT_ELEMENT', payload: null });
    }
  };

  const duplicateElement = (elementId: string) => {
    if (!state.currentTemplate) return;
    
    const element = findElementById(state.currentTemplate.elements, elementId);
    if (!element) return;

    const duplicateElementRecursively = (el: EmailElement | LayoutElement): EmailElement | LayoutElement => {
      const newEl = { ...el, id: generateId() };
      if ('children' in newEl && newEl.children) {
        newEl.children = newEl.children.map(duplicateElementRecursively);
      }
      return newEl;
    };

    addElement(duplicateElementRecursively(element));
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    if (!state.currentTemplate) return;

    const moveInArray = (arr: (EmailElement | LayoutElement)[], id: string, dir: 'up' | 'down'): (EmailElement | LayoutElement)[] => {
      const index = arr.findIndex(el => el.id === id);
      if (index === -1) return arr;

      const newIndex = dir === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= arr.length) return arr;

      const newArr = [...arr];
      [newArr[index], newArr[newIndex]] = [newArr[newIndex], newArr[index]];
      return newArr;
    };

    const updateElementsRecursively = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
      const updated = moveInArray(elements, elementId, direction);
      return updated.map(el => {
        if ('children' in el) {
          return { ...el, children: updateElementsRecursively(el.children) };
        }
        return el;
      });
    };

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updateElementsRecursively(state.currentTemplate.elements),
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
  };

  const moveElementToIndex = (elementId: string, newIndex: number) => {
    if (!state.currentTemplate) return;

    const removeElement = (elements: (EmailElement | LayoutElement)[]): { element: EmailElement | LayoutElement | null, remaining: (EmailElement | LayoutElement)[], originalIndex: number } => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === elementId) {
          const element = elements[i];
          const remaining = [...elements.slice(0, i), ...elements.slice(i + 1)];
          return { element, remaining, originalIndex: i };
        }
        if ('children' in elements[i] && (elements[i] as LayoutElement).children) {
          const result = removeElement((elements[i] as LayoutElement).children);
          if (result.element) {
            const updatedElement = { ...elements[i], children: result.remaining };
            const updatedElements = [...elements.slice(0, i), updatedElement, ...elements.slice(i + 1)];
            return { element: result.element, remaining: updatedElements, originalIndex: -1 };
          }
        }
      }
      return { element: null, remaining: elements, originalIndex: -1 };
    };

    const { element, remaining, originalIndex } = removeElement(state.currentTemplate.elements);
    if (!element) return;

    // Adjust the new index if we're moving within the same level and moving to a position after the original
    let adjustedIndex = newIndex;
    if (originalIndex !== -1 && originalIndex < newIndex) {
      adjustedIndex = Math.max(0, newIndex - 1);
    }

    // Ensure index is within bounds
    adjustedIndex = Math.min(adjustedIndex, remaining.length);

    const newElements = [...remaining];
    newElements.splice(adjustedIndex, 0, element);

    const updatedTemplate = {
      ...state.currentTemplate,
      elements: newElements,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  };

  const addElementToColumn = (rowId: string, columnIndex: number, element: EmailElement | LayoutElement) => {
    if (!state.currentTemplate) return;

    const newElements = [...state.currentTemplate.elements];
    const findAndUpdateRow = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
      return elements.map(el => {
        if (el.id === rowId && el.type === 'row') {
          const updatedChildren = [...(el.children || [])];
          updatedChildren[columnIndex] = element;
          return { ...el, children: updatedChildren };
        }
        if ('children' in el && el.children) {
          return { ...el, children: findAndUpdateRow(el.children) };
        }
        return el;
      });
    };

    const updatedElements = findAndUpdateRow(newElements);
    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updatedElements,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  };

  const moveElementToColumn = (elementId: string, rowId: string, columnIndex: number) => {
    if (!state.currentTemplate) return;

    // First, remove the element from wherever it currently is
    const removeElement = (elements: (EmailElement | LayoutElement)[]): { element: EmailElement | LayoutElement | null, remaining: (EmailElement | LayoutElement)[] } => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === elementId) {
          const element = elements[i];
          const remaining = [...elements.slice(0, i), ...elements.slice(i + 1)];
          return { element, remaining };
        }
        if ('children' in elements[i] && (elements[i] as LayoutElement).children) {
          const result = removeElement((elements[i] as LayoutElement).children);
          if (result.element) {
            const updatedElement = { ...elements[i], children: result.remaining };
            const updatedElements = [...elements.slice(0, i), updatedElement, ...elements.slice(i + 1)];
            return { element: result.element, remaining: updatedElements };
          }
        }
      }
      return { element: null, remaining: elements };
    };

    const { element, remaining } = removeElement(state.currentTemplate.elements);
    if (!element) return;

    // Now add the element to the specified column
    const addToColumn = (elements: (EmailElement | LayoutElement)[]): (EmailElement | LayoutElement)[] => {
      return elements.map(el => {
        if (el.id === rowId && el.type === 'row') {
          const updatedChildren = [...(el.children || [])];
          updatedChildren[columnIndex] = element;
          return { ...el, children: updatedChildren };
        }
        if ('children' in el && el.children) {
          return { ...el, children: addToColumn(el.children) };
        }
        return el;
      });
    };

    const updatedElements = addToColumn(remaining);
    const updatedTemplate = {
      ...state.currentTemplate,
      elements: updatedElements,
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TO_HISTORY', payload: updatedTemplate });
    dispatch({ type: 'SET_TEMPLATE', payload: updatedTemplate });
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  };

  const contextValue: AppContextType = {
    ...state,
    dispatch,
    addElement,
    addElementAtIndex,
    updateTemplate,
    updateElement,
    deleteElement,
    selectElement: (element) => dispatch({ type: 'SELECT_ELEMENT', payload: element }),
    setViewMode: (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    setTheme: (theme) => {
      dispatch({ type: 'SET_THEME', payload: theme });
      updateTemplate({ theme });
    },
    toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' }),
    saveTemplate: () => {
      if (state.currentTemplate) {
        dispatch({ type: 'ADD_TO_HISTORY', payload: state.currentTemplate });
      }
    },
    loadTemplate: (template) => {
      dispatch({ type: 'SET_THEME', payload: template.theme });
      dispatch({ type: 'ADD_TO_HISTORY', payload: template });
      dispatch({ type: 'SET_TEMPLATE', payload: template });
    },
    clearTemplate: () => {
      const newTemplate = { ...initialTemplate, id: generateId() };
      dispatch({ type: 'SET_THEME', payload: newTemplate.theme });
      dispatch({ type: 'ADD_TO_HISTORY', payload: newTemplate });
      dispatch({ type: 'SET_TEMPLATE', payload: newTemplate });
      dispatch({ type: 'SELECT_ELEMENT', payload: null });
    },
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    duplicateElement,
    moveElement,
    addElementToColumn,
    moveElementToIndex,
    moveElementToColumn
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
