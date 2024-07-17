export type SizeProduct = {
    _id: string;
    abbreviation: string;
    name: string;
    description: string;
    isActive: boolean;
};

export type ColorProduct = {
    _id: string;
    name: string;
    hex: string;
    images: Array<string>;
    isActive: boolean;
    sold: number;
};

export type ReviewProduct = {
    productId: string;
    _id: string;
    content: string;
    title: string;
    owner: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
    rate: number | 0;
    photos: Array<string>;
    updatedAt: string;
};

export type Category = {
    _id: string;
    key: string;
    name: string;
    description: string | null | undefined;
    img: string;
    productCount: number;
};

export type Product = {
    category: Partial<Category>;
    _id: string;
    previewImages: Array<string>;
    name: string;
    description: string;
    price: number;
    discount: number;
    colors: Array<ColorProduct>;
    sizes: Array<SizeProduct>;
    sex: string;
    stock: number;
    sold: number;
    rate: number;
};

export type SubProduct = Pick<Product, "_id" | "previewImages" | "name" | "price" | "discount" | "sold">;

export type CartItem = {
    product: Product;
    quantity: number;
};
