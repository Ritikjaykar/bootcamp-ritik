export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export function mapUser(row: any): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
    };
  }
  