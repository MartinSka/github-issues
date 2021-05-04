import { Issue, State } from "../models/Issue";

export const mockLabels = [
  {
    id: 1,
    color: "a2eeef",
    default: true,
    decription: "New feature or request",
    name: "Label 1",
    node_id: "MDU6TGFiZWwyODQ0MzM4ODQ3",
    url: "http://label",
  },
];

export const mockIssue: Issue = {
  body: "Body of the issue",
  title: "This is a title",
  state: State.open,
  labels: mockLabels,
  html_url: "http://",
  created_at: "2021-04-16T06:13:13Z",
  assignees: [],
  author_association: "author_association",
  comments: 0,
  comments_url: "comments_url",
  events_url: "events_url",
  id: 1,
  labels_url: "labels_url",
  locked: false,
  node_id: "node_id",
  number: 1,
  repository_url: "repository_url",
  score: 1,
  updated_at: "updated_at",
  url: "http://issue/url",
  user: {
    avatar_url: "avatar_url",
    events_url: "events_url",
    followers_url: "followers_url",
    following_url: "following_url",
    gists_url: "gists_url",
    gravatar_id: "gravatar_id",
    html_url: "html_url",
    id: 1,
    login: "user name",
    node_id: "node_id",
    organizations_url: "organizations_url",
    received_events_url: "received_events_url",
    repos_url: "repos_url",
    site_admin: false,
    starred_url: "starred_url",
    subscriptions_url: "subscriptions_url",
    type: "type",
    url: "https://user/url",
  },
};
