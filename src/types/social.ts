export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  provider: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  event_id: string | null;
  discussion_id: string | null;
  parent_id: string | null;
  content: string;
  sentiment_score: number | null;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
  vote_count?: number;
  user_vote?: number;
  replies?: Comment[];
}

export interface CommentVote {
  id: string;
  comment_id: string;
  user_id: string;
  vote: -1 | 1;
}

export interface Discussion {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  category: 'general' | 'events' | 'analysis' | 'off-topic';
  pinned: boolean;
  created_at: string;
  profile?: UserProfile;
  comment_count?: number;
}

export interface Poll {
  id: string;
  user_id: string;
  question: string;
  options: string[];
  category: string;
  closes_at: string | null;
  created_at: string;
  profile?: UserProfile;
  votes?: PollVoteCount[];
  user_vote?: number | null;
  total_votes?: number;
}

export interface PollVoteCount {
  option_index: number;
  count: number;
}

export interface PollVote {
  id: string;
  poll_id: string;
  user_id: string;
  option_index: number;
}

export interface PageView {
  id: string;
  page: string;
  user_id: string | null;
  session_id: string;
  timestamp: string;
}

export interface Feedback {
  id: string;
  user_id: string | null;
  page: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface SentimentResult {
  score: number;
  comparative: number;
  label: 'positive' | 'negative' | 'neutral';
}

export interface AnalyticsData {
  pageViews: { page: string; count: number }[];
  sentimentBreakdown: { label: string; count: number }[];
  popularEvents: { event_id: string; comment_count: number }[];
  feedbackByPage: { page: string; avg_rating: number; count: number }[];
  dailyActivity: { date: string; comments: number; views: number }[];
  recentFeedback: Feedback[];
}
