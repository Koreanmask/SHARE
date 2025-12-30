import React, { useState } from 'react';
import SplineHero from './components/SplineHero';
import FileCard from './components/FileCard';
import AssistantPanel from './components/AssistantPanel';
import UploadModal from './components/UploadModal';
import FilePreviewModal from './components/FilePreviewModal';
import { MOCK_FILES } from './constants';
import { ShareFile, FileCategory, ViewMode } from './types';
import { 
  Search, 
  Menu, 
  Bot, 
  LayoutGrid, 
  ListFilter,
  Bell,
  Plus,
  Zap,
  Globe2,
  Cpu,
  CheckCircle2,
  User
} from 'lucide-react';

const App: React.FC = () => {
  // State
  const [files, setFiles] = useState<ShareFile[]>(MOCK_FILES);
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Modals & Panels
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ShareFile | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredFiles = files.filter(file => {
    const matchesCategory = activeCategory === '전체' || file.category === activeCategory;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['전체', ...Object.values(FileCategory)];

  // Handlers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileUpload = (fileData: Omit<ShareFile, 'id' | 'date' | 'downloads' | 'uploader'>) => {
    const newFile: ShareFile = {
      ...fileData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      uploader: '관리자 (You)'
    };
    
    setFiles([newFile, ...files]);
    showToast(`파일 "${newFile.name}" 업로드가 완료되었습니다!`);
    scrollToSection('dashboard');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-800 font-sans selection:bg-brand-200 overflow-x-hidden relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-[70] animate-fade-in">
           <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
             <CheckCircle2 className="w-5 h-5 text-green-400" />
             <span className="font-medium">{toastMessage}</span>
           </div>
        </div>
      )}

      {/* Floating Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center">
        <nav className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-full px-6 py-3 flex justify-between items-center transition-all hover:bg-white/80 relative">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">SHARE</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-gray-900 hover:text-brand-600 transition-colors">홈</button>
            <button onClick={() => scrollToSection('dashboard')} className="hover:text-brand-600 transition-colors">파일</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-brand-600 transition-colors">기능</button>
            <button onClick={() => showToast('커뮤니티 기능은 준비 중입니다!')} className="hover:text-brand-600 transition-colors">커뮤니티</button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
             <button 
              onClick={() => setIsAssistantOpen(true)}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg text-xs font-semibold"
             >
               <Bot className="w-3.5 h-3.5" />
               <span>AI 비서</span>
             </button>
             
             <div className="relative">
               <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative"
               >
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               
               {/* Notifications Dropdown */}
               {showNotifications && (
                 <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fade-in z-50">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">알림</h3>
                    <div className="space-y-3">
                       <div className="flex items-start space-x-3 text-sm">
                          <div className="w-2 h-2 bg-brand-500 rounded-full mt-1.5"></div>
                          <div>
                             <p className="font-semibold text-gray-800">새로운 보고서 업로드</p>
                             <p className="text-gray-500 text-xs">김민지 님이 구조 하중 분석 문서를 추가했습니다.</p>
                          </div>
                       </div>
                       <div className="flex items-start space-x-3 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <div>
                             <p className="font-semibold text-gray-800">시스템 업데이트</p>
                             <p className="text-gray-500 text-xs">AI 비서 기능이 업그레이드 되었습니다.</p>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
             </div>

             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-accent-purple p-[2px] cursor-pointer" onClick={() => showToast('데모 사용자로 로그인 됨')}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-600">JD</span>
                </div>
             </div>
          </div>
        </nav>
      </div>

      <main>
        
        {/* Immersive Hero Section */}
        <section className="relative h-[85vh] min-h-[700px] w-full bg-gray-50 overflow-hidden">
          
          {/* Spline 3D Background */}
          <div className="absolute inset-0 z-0 scale-110">
             <SplineHero />
          </div>

          {/* Gradient Overlay for seamless transition to content */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFDFD] z-10 pointer-events-none"></div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none mt-16">
             <div className="max-w-4xl mx-auto px-4 text-center space-y-8 pointer-events-auto">
                
                <div className="animate-fade-in inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-sm mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Next Gen Civil Engineering</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight drop-shadow-sm mix-blend-overlay opacity-90">
                  We Are <br/>
                  The Future.
                </h1>
                
                <p className="text-2xl md:text-3xl font-light text-gray-600 max-w-2xl mx-auto">
                  Let's <span className="font-bold text-brand-600 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-accent-purple">SHARE</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-2 group"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>자료 업로드</span>
                  </button>
                  <button 
                    onClick={() => scrollToSection('dashboard')}
                    className="px-8 py-4 bg-white/50 backdrop-blur-md border border-white/60 text-gray-800 rounded-2xl font-bold hover:bg-white transition-all shadow-sm hover:shadow-md"
                  >
                    데이터베이스 탐색
                  </button>
                </div>

             </div>
          </div>
        </section>

        {/* Stats / Trust Banner */}
        <section className="relative z-20 -mt-20 pb-20">
           <div className="max-w-6xl mx-auto px-4">
              <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl flex flex-wrap justify-around items-center gap-8">
                 <div className="text-center">
                    <p className="text-3xl font-black text-gray-900">{files.length * 125}+</p>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">엔지니어링 파일</p>
                 </div>
                 <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                 <div className="text-center">
                    <p className="text-3xl font-black text-gray-900">500+</p>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">진행 중인 프로젝트</p>
                 </div>
                 <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                 <div className="text-center">
                    <p className="text-3xl font-black text-gray-900">24/7</p>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AI 지원</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          
          {/* Dashboard Section */}
          <section className="space-y-8" id="dashboard">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center space-y-6 md:space-y-0 border-b border-gray-100 pb-6">
               <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-gray-900 tracking-tight">프로젝트 파일</h2>
                  <p className="text-gray-500">팀의 엔지니어링 리소스에 액세스하고 관리하세요.</p>
               </div>
               
               {/* Advanced Search Bar */}
               <div className="w-full md:w-auto bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 flex items-center">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="도면, 보고서 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm focus:outline-none placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <div className="h-6 w-px bg-gray-200 mx-2"></div>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-500'}`}
                  >
                     <ListFilter className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-500'}`}
                  >
                     <LayoutGrid className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Filter Pills */}
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide mask-fade-right">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 transform scale-105' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* File Grid */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col space-y-4'} animate-fade-in min-h-[400px]`}>
              {filteredFiles.map((file) => (
                <FileCard 
                  key={file.id} 
                  file={file} 
                  viewMode={viewMode}
                  onClick={() => setSelectedFile(file)}
                />
              ))}
              
              {filteredFiles.length === 0 && (
                 <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900">파일을 찾을 수 없습니다</h3>
                   <p className="text-gray-500 mb-6">검색어나 필터를 조정해 보세요.</p>
                   <button 
                      onClick={() => {setSearchQuery(''); setActiveCategory('전체');}}
                      className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                   >
                      초기화
                   </button>
                 </div>
              )}
            </div>
          </section>

          {/* Features Bento Grid */}
          <section className="py-12" id="features">
             <div className="text-center mb-12 space-y-2">
                <span className="text-brand-600 font-bold uppercase tracking-wider text-xs">워트플로우 혁신</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">현대 엔지니어링을 위한 설계</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* Large Block - AI */}
                <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group text-white shadow-2xl">
                   <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                           <Bot className="w-6 h-6 text-brand-300" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">AI 기반 기술 분석</h3>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                          Gemini가 통합된 어시스턴트가 구조 보고서를 요약하고, 안전율을 추출하며, 기술적인 질문에 실시간으로 답변합니다.
                        </p>
                      </div>
                      <div className="mt-8">
                         <button onClick={() => setIsAssistantOpen(true)} className="inline-flex items-center space-x-2 text-brand-300 font-bold hover:text-white transition-colors">
                            <span>AI 비서 사용해보기</span>
                            <Plus className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                   {/* Abstract decoration */}
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                </div>

                {/* Small Block - Sync */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                   <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                      <Globe2 className="w-6 h-6 text-purple-600" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">글로벌 동기화</h3>
                      <p className="text-sm text-gray-500">현장 태블릿과 사무실 CAD 워크스테이션 간의 실시간 연결.</p>
                   </div>
                </div>

                {/* Small Block - Tech */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                      <Cpu className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">버전 관리</h3>
                      <p className="text-sm text-gray-500">DWG 및 REVIT 파일 수정 사항에 대한 자동 추적 시스템.</p>
                   </div>
                </div>

             </div>
          </section>

        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
               <span className="font-bold text-gray-900 text-lg">SHARE</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500 font-medium">
               <a href="#" className="hover:text-gray-900 transition-colors">개인정보처리방침</a>
               <a href="#" className="hover:text-gray-900 transition-colors">이용약관</a>
               <a href="#" className="hover:text-gray-900 transition-colors">문의하기</a>
            </div>
            <p className="text-gray-400 text-sm">© 2024 SHARE Engineering Systems.</p>
         </div>
      </footer>

      {/* Interactive Elements */}
      <AssistantPanel isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUpload={handleFileUpload} 
      />

      <FilePreviewModal 
        file={selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
      
      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="md:hidden fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-95 transition-all border-2 border-white/20"
      >
        <Bot className="w-6 h-6" />
      </button>

    </div>
  );
};

export default App;