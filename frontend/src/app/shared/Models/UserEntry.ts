export interface UserEntry {
  id: number;
  value: string;
  upvotes: number;
  downvotes: number;
  entered: boolean;
  user?: string;
}
