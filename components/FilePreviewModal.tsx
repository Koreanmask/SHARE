import React from 'react';
import { X, Download, Share2, Eye, Calendar, User, HardDrive } from 'lucide-react';
import { ShareFile } from '../types';

interface FilePreviewModalProps {
  file: ShareFile | null;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden animate-float">
        
        {/* Header Image / Icon Area */}
        <div className="bg-gray-50 p-8 flex justify-center items-center border-b border-gray-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl font-bold text-brand-600">
             {file.icon.toUpperCase()}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
               <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 rounded-lg text-xs font-bold uppercase tracking-wider mb-2">
                  {file.category}
               </div>
               <h2 className="text-2xl font-bold text-gray-900">{file.name}</h2>
            </div>
            <div className="flex space-x-2">
               <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600">
                  <Share2 className="w-5 h-5" />
               </button>
               <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Download className="w-5 h-5" />
                  <span>다운로드</span>
               </button>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {file.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                   <User className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">업로더</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm truncate">{file.uploader}</p>
             </div>
             <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                   <HardDrive className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">크기</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{file.size}</p>
             </div>
             <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                   <Calendar className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">날짜</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{file.date}</p>
             </div>
             <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                   <Eye className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">조회수</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{file.downloads * 3}</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;