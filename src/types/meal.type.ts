export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  averageRating: number;
  totalReviews: number;
  status: "AVAILABLE" | "OUT_OF_STOCK";
  providerId: string;
  providerName?: string; 
  createdAt: string;
  updatedAt: string;
}