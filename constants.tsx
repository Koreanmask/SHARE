import { ShareFile, FileCategory } from './types';

export const MOCK_FILES: ShareFile[] = [
  {
    id: '1',
    name: '기초 하중 분석 보고서 - A동',
    description: '주거용 타워 메인 기초에 대한 구조 계산 보고서입니다. 파일 용량 검토 포함.',
    category: FileCategory.STRUCTURAL,
    uploader: '김민지 엔지니어',
    size: '4.2 MB',
    date: '2023-10-24',
    downloads: 124,
    icon: 'pdf'
  },
  {
    id: '2',
    name: '옹벽 표준 상세도',
    description: '캔틸레버 옹벽(H=3m~6m)에 대한 업데이트된 CAD 상세도입니다. Eurocode 7 준수.',
    category: FileCategory.CAD_STANDARDS,
    uploader: '설계팀',
    size: '12.8 MB',
    date: '2023-11-01',
    downloads: 89,
    icon: 'dwg'
  },
  {
    id: '3',
    name: '지반 조사 보고서 - 현장 404',
    description: '시추 주상도, SPT 값 및 실내 시험 결과를 포함한 종합 지반 공학 보고서입니다.',
    category: FileCategory.GEOTECHNICAL,
    uploader: '지반 연구소',
    size: '25.1 MB',
    date: '2023-10-15',
    downloads: 56,
    icon: 'pdf'
  },
  {
    id: '4',
    name: '도로 선형 계산기',
    description: '설계 속도 입력을 기반으로 평면 및 종단 곡선을 계산하는 엑셀 도구입니다.',
    category: FileCategory.TRANSPORTATION,
    uploader: '홍길동',
    size: '1.5 MB',
    date: '2023-09-30',
    downloads: 210,
    icon: 'xlsx'
  },
  {
    id: '5',
    name: '배수 네트워크 마스터플랜',
    description: '신규 산업 단지를 위한 우수 관리 계획 및 파이프 네트워크 레이아웃 도면입니다.',
    category: FileCategory.ENVIRONMENTAL,
    uploader: '상하수도 부서',
    size: '34.0 MB',
    date: '2023-11-05',
    downloads: 45,
    icon: 'dwg'
  },
  {
    id: '6',
    name: '강구조 접합부 표준 v2',
    description: '철골 프레임에 대한 표준화된 모멘트 및 전단 접합부 상세입니다.',
    category: FileCategory.STRUCTURAL,
    uploader: '철골팀 리더',
    size: '8.2 MB',
    date: '2023-11-08',
    downloads: 167,
    icon: 'pdf'
  }
];