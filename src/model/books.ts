export interface Books {
  data: Data;
}

export interface Data {
  id: number;
  Year: number;
  title: string;
  handle: string;
  publisher: string;
  isbn: string;
  pages: number;
  notes: string[];
  villains: Villain[];
}

export interface Villain {
  name: string;
  power: string;
  // outros campos...
}
