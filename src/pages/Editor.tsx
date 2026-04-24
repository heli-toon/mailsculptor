import { useEffect } from 'react';
import { TopBar } from '../components/Layout/TopBar';
import { LeftToolbar } from '../components/Toolbar/LeftToolbar';
import { Canvas } from '../components/Canvas/Canvas';
import { RightSidebar } from '../components/Settings/RightSidebar';
import { useApp } from '../contexts/AppContext';

export function Editor() {
  const { undo, redo } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden lg:block">
          <LeftToolbar />
        </div>
        <Canvas />
        <RightSidebar />
      </div>
    </div>
  );
}
