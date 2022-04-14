export interface UserParameters {
  filterBy: 'email' | 'name' | 'surname';
  filterText: string;
  sortBy: 'name' | 'email' | 'tel';
  direction: 'asc' | 'desc';
  limit: number;
  skip: number;
}
