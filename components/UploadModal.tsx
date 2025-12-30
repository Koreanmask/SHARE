import React, { useState } from 'react';
import { X, UploadCloud, FileText, Check } from 'lucide-react';
import { FileCategory, ShareFile } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileData: Omit<ShareFile, 'id' | 'date' | 'downloads' | 'uploader'>) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FileCategory>(FileCategory.STRUCTURAL);
  const [fileType, setFileType] = useState<'pdf' | 'dwg' | 'xlsx' | 'doc'>('pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      onUpload({
        name,
        description,
        category,
        icon: fileType,
        size: (Math.random() * 10 + 1).toFixed(1) + ' MB'
      });
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory(FileCategory.STRUCTURAL);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-gray-100">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-white/10 rounded-xl">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">자료 업로드</h2>
              <p className="text-xs text-gray-300">엔지니어링 팀과 파일을 공유하세요</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">파일 이름</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 구조 계산서 v2"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">카테고리</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FileCategory)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none"
                >
                  {Object.values(FileCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">파일 형식</label>
                <select 
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none"
                >
                  <option value="pdf">PDF 문서</option>
                  <option value="dwg">AutoCAD (DWG)</option>
                  <option value="xlsx">Excel 시트</option>
                  <option value="doc">Word 문서</option>
                </select>
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">설명</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="내용에 대해 간략히 설명해주세요..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
            />
          </div>

          {/* Fake Dropzone Visual */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-brand-300 transition-colors cursor-pointer group">
             <FileText className="w-8 h-8 mb-2 group-hover:text-brand-500 transition-colors" />
             <span className="text-sm">파일을 드래그하거나 <span className="text-brand-600 font-bold">찾아보기</span></span>
             <span className="text-xs text-gray-300 mt-1">최대 용량: 50MB</span>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                 <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   <span>업로드 중...</span>
                 </>
              ) : (
                 <>
                   <UploadCloud className="w-5 h-5" />
                   <span>파일 업로드</span>
                 </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;