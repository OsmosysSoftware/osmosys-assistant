export interface Annotation {
  value: string[];
}

export interface TextContent {
  value: string;
  annotations?: Annotation[];
}
export interface Content {
  type: string;
  text: TextContent;
}
export interface ThreadMessage {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: 'assistant' | 'user';
  content: Content[];
  file_ids: string[];
  metadata: Record<string, unknown>;
}

export interface APIResponse {
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}
export interface Environment {
  production: boolean;
  apiUrl: string;
  assistants: { label: string; id: string; icon: string }[];
}
