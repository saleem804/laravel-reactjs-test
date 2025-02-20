export interface Source {
    id: number;
    name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Author {
    id: number;
    name: string;
  }
  
  export interface Article {
    id: number;
    title: string;
    content: string;
    url: string;
    image: string;
    source: Source;
    category: Category;
    author: Author;
    published_at: string;
  }
  