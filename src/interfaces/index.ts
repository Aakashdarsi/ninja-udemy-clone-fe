export interface ImageCardProps {
  src: string;
  title: string;
  body: string;
  isBtnReq?: boolean;
  btnTxt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
  maxQuantity: number;
}

export interface CartProps {
  items: CartItem[];
}

export interface ShimmerCardProps {
  btnReq: boolean;
}

export interface ProductDisplayCardProps {
  src: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  author: string;
  description: string;
  tags: string[];
}

export interface cartProdProps {
  src: string;
  originalPrice: number;
  discountedPrice: number;
  author: string;
}
