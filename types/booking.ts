
export interface Trade {
  id: string;
  trade_number: string;
  trade_date: string;
  is_active: boolean;
  created_at?: string;
}

export interface PoolingScheduleItem {
  id: string;
  trade_id: string;
  location: string;
  pooling_date: string;
  order_index: number;
}

export interface DropdownItem {
  id: string;
  category: string;
  label: string;
  is_active: boolean;
  order_index: number;
}

export interface TradeConfig {
  trade: Trade;
  pooling_schedule: PoolingScheduleItem[];
  dropdowns: {
    details: DropdownItem[];
    type: DropdownItem[];
    depot: DropdownItem[];
  };
}

export interface SubmissionFormSchema {
  phone_number: string;
  name: string;
  details: string;
  weight: number;
  type: string;
  depot: string;
}

export interface SubmissionResponse {
  success: boolean;
  submission_id?: string;
  error?: string;
  can_submit?: boolean;
}
