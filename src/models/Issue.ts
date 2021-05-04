import { Label } from "./Label";
import { User } from "./User";

export interface Issue {
  active_lock_reason?: string;
  assignee?: string;
  assignees: string[];
  author_association: string;
  body: string;
  closed_at?: string;
  comments: number;
  comments_url: string;
  created_at: string;
  events_url: string;
  html_url: string;
  id: number;
  labels: Label[];
  labels_url: string;
  locked: boolean;
  milestone?: string;
  node_id: string;
  number: number;
  performed_via_github_app?: string;
  repository_url: string;
  score: number;
  state: State;
  title: string;
  updated_at: string;
  url: string;
  user: User;
}

export interface IssueResponseError {
  documentation_url: string;
  message: string;
}

export enum State {
  open = "open",
  closed = "closed",
}
