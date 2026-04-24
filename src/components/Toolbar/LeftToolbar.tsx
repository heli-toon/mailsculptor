import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { ToolbarContent } from './ToolbarContent';
import { generateEmailHTMLFromTemplate } from '../../utils/emailExport';
import { copyToClipboard, downloadFile } from '../../utils/helpers';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export function LeftToolbar() {
  const { currentTemplate, clearTemplate } = useApp();

  const handleCopyHTML = async () => {
    if (!currentTemplate) return;

    try {
      const html = generateEmailHTMLFromTemplate(currentTemplate);
      await copyToClipboard(html);
      toast.success('HTML copied to clipboard!');
    } catch {
      toast.error('Failed to copy HTML');
    }
  };

  const handleDownloadHTML = () => {
    if (!currentTemplate) return;

    const html = generateEmailHTMLFromTemplate(currentTemplate);
    downloadFile(html, `${currentTemplate.name.toLowerCase().replace(/\s+/g, '-')}.html`);
    toast.success('HTML file downloaded!');
  };

  const handleClearTemplate = () => {
    Swal.fire({
      title: 'Clear Template?',
      text: 'This will remove all elements from your template. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Clear Template',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        clearTemplate();
        toast.success('Template cleared!');
      }
    });
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Elements</h2>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <ToolbarContent />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 flex-shrink-0">
        <Button variant="primary" className="w-full" onClick={handleCopyHTML}>
          <i className="bi bi-clipboard mr-2"></i>
          Copy HTML
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleDownloadHTML}>
          <i className="bi bi-download mr-2"></i>
          Download HTML
        </Button>
        <Button variant="danger" className="w-full" onClick={handleClearTemplate}>
          <i className="bi bi-trash mr-2"></i>
          Clear Template
        </Button>
      </div>
    </div>
  );
}
