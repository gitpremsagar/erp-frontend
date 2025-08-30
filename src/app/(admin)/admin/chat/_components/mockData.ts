export interface ChatConversation {
  id: string;
  customerName: string;
  customerEmail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
  avatar: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const chatConversations: ChatConversation[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    lastMessage: 'I need help with my order #12345',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    status: 'active',
    avatar: 'JS',
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    lastMessage: 'Thank you for the quick response!',
    lastMessageTime: '15 min ago',
    unreadCount: 0,
    status: 'active',
    avatar: 'SJ',
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Mike Wilson',
    customerEmail: 'mike.wilson@email.com',
    lastMessage: 'When will my refund be processed?',
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
    status: 'pending',
    avatar: 'MW',
    priority: 'high'
  },
  {
    id: '4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    lastMessage: 'The product arrived damaged',
    lastMessageTime: '2 hours ago',
    unreadCount: 0,
    status: 'resolved',
    avatar: 'ED',
    priority: 'medium'
  },
  {
    id: '5',
    customerName: 'David Brown',
    customerEmail: 'david.brown@email.com',
    lastMessage: 'Can I change my shipping address?',
    lastMessageTime: '3 hours ago',
    unreadCount: 0,
    status: 'active',
    avatar: 'DB',
    priority: 'low'
  }
];

export const chatMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      sender: 'customer',
      message: 'Hi, I need help with my order #12345. It says delivered but I haven\'t received it.',
      timestamp: '10:30 AM',
      isRead: true
    },
    {
      id: '2',
      sender: 'admin',
      message: 'Hello John! I\'m sorry to hear about this issue. Let me check the status of your order for you.',
      timestamp: '10:32 AM',
      isRead: true
    },
    {
      id: '3',
      sender: 'customer',
      message: 'Thank you! I\'m really worried because it\'s an expensive item.',
      timestamp: '10:33 AM',
      isRead: false
    },
    {
      id: '4',
      sender: 'customer',
      message: 'Can you please help me track it down?',
      timestamp: '10:33 AM',
      isRead: false
    }
  ],
  '2': [
    {
      id: '1',
      sender: 'customer',
      message: 'Hi, I have a question about the return policy.',
      timestamp: '9:15 AM',
      isRead: true
    },
    {
      id: '2',
      sender: 'admin',
      message: 'Hello Sarah! I\'d be happy to help you with our return policy. What specific question do you have?',
      timestamp: '9:17 AM',
      isRead: true
    },
    {
      id: '3',
      sender: 'customer',
      message: 'Thank you for the quick response! I was wondering if I can return an item after 30 days.',
      timestamp: '9:20 AM',
      isRead: true
    },
    {
      id: '4',
      sender: 'admin',
      message: 'Our standard return policy is 30 days, but we can make exceptions in certain circumstances. What\'s the reason for the return?',
      timestamp: '9:22 AM',
      isRead: true
    },
    {
      id: '5',
      sender: 'customer',
      message: 'The item arrived damaged and I was traveling, so I couldn\'t return it immediately.',
      timestamp: '9:25 AM',
      isRead: true
    },
    {
      id: '6',
      sender: 'admin',
      message: 'I understand! For damaged items, we can definitely make an exception. I\'ll process your return right away.',
      timestamp: '9:27 AM',
      isRead: true
    },
    {
      id: '7',
      sender: 'customer',
      message: 'Thank you for the quick response!',
      timestamp: '9:30 AM',
      isRead: true
    }
  ]
};
