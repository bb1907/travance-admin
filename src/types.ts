export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface CustomerInfo {
  name: string;
  email?: string;
  initials: string;
  color: string;
}

export interface Booking {
  id: string;
  customer: CustomerInfo;
  trip: string;
  type: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

export interface Payment {
  id: string;
  customer: CustomerInfo;
  description: string;
  bookingId: string;
  date: string;
  amount: string;
  currency: string;
  status: 'Succeeded' | 'Pending' | 'Failed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'human';
  content: string;
  time: string;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalEarnings: string;
  balance: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joinedDate: string;
}

export interface Referral {
  id: string;
  affiliateId: string;
  affiliateName: string;
  customerName: string;
  bookingId: string;
  bookingAmount: string;
  commissionAmount: string; // 20% of bookingAmount
  date: string;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
}

export interface Conversation {
  id: string;
  customer: CustomerInfo;
  lastMessage: string;
  time: string;
  status: 'active' | 'resolved' | 'escalated';
  unread?: boolean;
}
