import React from 'react';
import { ShareFile, ViewMode } from '../types';
import { FileText, DraftingCompass, Table2, HardHat, Download, Clock } from 'lucide-react';

interface FileCardProps {
  file: ShareFile;
  viewMode?: ViewMode;
  onClick?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, viewMode = 'grid', onClick }) => {
  const getIcon = () => {
    switch (file.icon) {
      case 'dwg': return <DraftingCompass className="w-6 h-6 text-brand-600" />;
      case 'xlsx': return <Table2 className="w-6 h-6 text-emerald-500" />;
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      default: return <HardHat className="w-6 h-6 text-amber-500" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 hover:border-brand-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-4 flex-1">
           <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-brand-50 transition-colors">
             {getIcon()}
           </div>
           <div>
              <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{file.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{file.description}</p>
           </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 px-4 text-sm text-gray-500">
           <span className="w-24 truncate">{file.category}</span>
           <span className="w-24 truncate">{file.uploader}</span>
           <span className="w-16">{file.size}</span>
        </div>

        <div className="flex items-center space-x-2 pl-4 border-l border-gray-100">
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
           </button>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      
      {/* Hover Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      <div className="flex justify-between items-start mb-5">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-brand-50 transition-colors">
          {getIcon()}
        </div>
        <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                {file.category}
             </span>
             <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-mono group-hover:bg-gray-200 transition-colors">
                {file.icon.toUpperCase()}
             </span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors line-clamp-1">
        {file.name}
      </h3>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">
        {file.description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[9px] font-bold text-gray-600 border border-white">
                {file.uploader.charAt(0)}
            </div>
            <span className="text-xs font-medium text-gray-600">{file.uploader.split(' ')[0]}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-400 font-medium">
             <span className="flex items-center space-x-1 hover:text-gray-600 transition-colors cursor-help" title="Downloads">
                <Download className="w-3.5 h-3.5" />
                <span>{file.downloads}</span>
             </span>
             <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{file.date.split('-')[1]}/{file.date.split('-')[2]}</span>
             </span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;