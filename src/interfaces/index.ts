import { StaticImageData } from 'next/image';
import { ColumnBodyOptions } from 'primereact/column';

export interface Testimonial {
  title: string;
  body: string;
  user: string;
  color: string;
  imgUrl: StaticImageData;
}

export type Testimonials = Testimonial[];

export interface TableHeadersProps {
  title: string;
  style?: string;
  field: string;
  sortable?: boolean;
  frozen?: boolean;
  body?:
    | React.ReactNode
    | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  onRowClick?: () => void;
}

export interface TableProps {
  data: any[];
  headers: TableHeadersProps[];
  selectable?: boolean;
  stripedRows?: boolean;
  showGridlines?: boolean;
  sortMode?: 'single' | 'multiple';
  scrollable?: boolean;
  loading?: boolean;
  desktopOnly?: boolean;
  dataKey?: string;
  children?: React.ReactNode;
  selectionMode?: 'multiple' | 'single';
  scrollHeight?: string;
  onRowSelect?: () => void;
  onRowUnselect?: () => void;
  selectedData?: any[] | null;
  onSelectionChange?: (e: any) => void;
}

export interface SliderImageType {
  id: number;
  image: string;
}
