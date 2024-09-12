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
    totalSold: number;
    rate: number;
};

export type SubProduct = Pick<Product, "_id" | "previewImages" | "name" | "price" | "discount" | "totalSold">;

export type OrderFilterType =
    | "asc"
    | "desc"
    | "lowest"
    | "highest"
    | "newest"
    | "sales"
    | "featured"
    | "top-rated"
    | undefined;
export type PriceFilterType = `${number | string}-${number | string}` | undefined;
export type SexFilterType = "all" | "unisex" | "men" | "women";
export type StockFilterType = "in-stock" | "out-stock" | "all";
export type ProductFilterType = {
    query?: string;
    category?: string;
    sex?: SexFilterType;
    price?: PriceFilterType;
    pageSize: number;
    stock?: StockFilterType;
    order?: OrderFilterType;
    page: number;
};

export type CartItem = {
    product: Omit<Product, "totalSold" | "rate" | "colors" | "sizes"> & {
        color: ColorProduct;
        size: SizeProduct;
    };
    quantity: number;
};

export type DeviceType = "desktop" | "tablet" | "mobile";

export type Shipping = {
    id: number | string;
    name: string;
    fee: number;
};
