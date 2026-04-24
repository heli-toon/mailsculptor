import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { sampleTemplates } from '../data/templates';
import { Button } from '../components/ui/Button';
import { getThemeColors } from '../utils/helpers';

export function Templates() {
  const navigate = useNavigate();
  const { loadTemplate } = useApp();

  const handleSelectTemplate = (template: typeof sampleTemplates[0]) => {
    loadTemplate(template);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Templates</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Choose a template to get started or create your own
              </p>
            </div>
            <Button onClick={() => navigate('/')}>
              <i className="bi bi-plus mr-2"></i>
              Create Blank Template
            </Button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTemplates.map((template) => {
            const themeColors = getThemeColors(template.theme);
            
            return (
              <div
                key={template.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Preview */}
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded shadow-sm scale-75 group-hover:scale-80 transition-transform">
                    <div className="h-full flex flex-col">
                      {/* Simulated email header */}
                      <div 
                        className="h-12 flex items-center justify-center text-white text-xs font-medium"
                        style={{ backgroundColor: themeColors.primary }}
                      >
                        {template.name}
                      </div>
                      
                      {/* Content preview */}
                      <div className="flex-1 p-3 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                        
                        <div className="mt-4 flex justify-center">
                          <div 
                            className="px-3 py-1 text-white text-xs rounded"
                            style={{ backgroundColor: themeColors.primary }}
                          >
                            Button
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm">
                        <i className="bi bi-arrow-right mr-1"></i>
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: themeColors.primary }}
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {template.theme} theme
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {template.elements.length} elements
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Create New Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                <i className="bi bi-plus-circle text-4xl mb-3 block"></i>
                <h3 className="font-medium">Create Blank Template</h3>
                <p className="text-sm mt-1">Start from scratch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
