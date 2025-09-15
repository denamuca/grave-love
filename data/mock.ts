export type Memorial = {
  id: string;
  slug: string;
  name_full: string;
  date_birth: string;
  date_death: string;
  bio?: string;
  cemetery?: string;
  plot?: string;
  cover_image?: any;
};

export type Post = {
  id: string;
  memorial_id: string;
  type: 'story' | 'photo' | 'video' | 'candle' | 'message';
  text?: string;
  media_url?: string;
  created_at: string;
  author?: string;
};

export type ServiceType = {
  id: string;
  name: string;
  key: 'cleaning_basic' | 'flowers_standard';
  price: string;
};

export type Job = {
  id: string;
  memorial_id: string;
  memorial_name: string;
  type: 'cleaning' | 'flowers';
  scheduled_date: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  notes?: string;
};

export const memorials: Memorial[] = [
  {
    id: 'm1',
    slug: 'john-doe',
    name_full: 'John A. Doe',
    date_birth: '1945-03-14',
    date_death: '2023-10-30',
    bio: 'Beloved father, avid gardener, and jazz enthusiast.',
    cemetery: 'Greenwood Cemetery',
    plot: 'Section B, Row 4, Plot 12',
    cover_image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    id: 'm2',
    slug: 'jane-smith',
    name_full: 'Jane Smith',
    date_birth: '1952-07-02',
    date_death: '2022-05-18',
    bio: 'Teacher, volunteer, and friend to many.',
    cemetery: 'Evergreen Memorial Park',
    plot: 'Lot 7, Plot 3',
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    memorial_id: 'm1',
    type: 'candle',
    text: 'Lighting a candle in your memory',
    created_at: '2024-11-01T10:00:00Z',
    author: 'Emily D.',
  },
  {
    id: 'p2',
    memorial_id: 'm1',
    type: 'message',
    text: 'Miss you every day. The garden looks beautiful this fall.',
    created_at: '2024-11-02T12:00:00Z',
    author: 'Michael',
  },
  {
    id: 'p3',
    memorial_id: 'm2',
    type: 'photo',
    text: 'Jane at the school fundraiser, 2019',
    media_url: 'https://picsum.photos/300/200',
    created_at: '2024-10-20T09:30:00Z',
    author: 'PTA',
  },
];

export const serviceTypes: ServiceType[] = [
  { id: 's1', key: 'cleaning_basic', name: 'Grave Cleaning (Basic)', price: '$40' },
  { id: 's2', key: 'flowers_standard', name: 'Fresh Flowers (Standard)', price: '$35' },
];

export const jobs: Job[] = [
  {
    id: 'j1',
    memorial_id: 'm1',
    memorial_name: 'John A. Doe',
    type: 'cleaning',
    scheduled_date: '2025-10-30',
    status: 'scheduled',
    notes: 'Before/after photos required',
  },
  {
    id: 'j2',
    memorial_id: 'm2',
    memorial_name: 'Jane Smith',
    type: 'flowers',
    scheduled_date: '2025-10-31',
    status: 'scheduled',
  },
];

