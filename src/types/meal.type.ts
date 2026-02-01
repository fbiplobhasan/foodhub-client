export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null; 
  dietaryType: "VEG" | "NON_VEG"; 
  categoryId: string;
  providerId: string;
  createdAt: string;
  
  category: {
    id: string;
    name: string;
  };

  provider: {
    id: string;
    storeName: string;
    address: string;
  };
}