export interface ICard {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export interface IDraggableCard {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  dragId: number;
  isDragging: boolean;
}

export interface IFeedOrder {
  _id: string;
  ingredients: string[];
  status: "pending" | "created" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface IOrder {
  createdAt: string;
  ingredients: ICard[];
  name: string;
  number: number;
  owner: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
  price: number;
  status: "pending" | "created" | "done";
  updatedAt: string;
  _id: string;
}

export interface IFeedOrderCardIngredient {
  repeat: number;
  structure: ICard;
}

export interface SuccessResponse {
  success: boolean;
  [key: string]: any;
}
