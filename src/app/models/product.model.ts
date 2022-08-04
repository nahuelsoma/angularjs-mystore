export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDto extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {} // Partial makes every attribute optional
