export interface WritableTagType {
  tag: string;
  value: number | boolean;
}

export interface ReadableTagType {
  id: string;
  tag: string;
  table: string;
}

export interface UpdatedTagType {
  id: string;
  tag: string;
  value: number | boolean;
}
