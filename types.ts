export enum FileCategory {
  STRUCTURAL = '구조',
  GEOTECHNICAL = '지반',
  TRANSPORTATION = '교통',
  ENVIRONMENTAL = '환경',
  CAD_STANDARDS = 'CAD 표준',
}

export interface ShareFile {
  id: string;
  name: string;
  description: string;
  category: FileCategory;
  uploader: string;
  size: string;
  date: string;
  downloads: number;
  icon: 'pdf' | 'dwg' | 'xlsx' | 'doc';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewMode = 'grid' | 'list';