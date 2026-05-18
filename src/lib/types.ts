export type TenderStatus = 'active' | 'closed' | 'upcoming';
export type TenderCategory = 'construction' | 'it' | 'healthcare' | 'education' | 'defense' | 'infrastructure';

export interface Tender {
  id: string;
  title: string;
  organization: string;
  state: string;
  category: TenderCategory;
  value: number;
  deadline: string;
  publishedDate: string;
  status: TenderStatus;
  tenderNo: string;
  description: string;
  documents: string[];
  emd: number;
  bidFee: number;
  isPremium: boolean;
}
