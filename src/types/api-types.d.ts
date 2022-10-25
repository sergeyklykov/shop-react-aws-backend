export interface Product {
    id: string,
    description: string,
    title: string,
    price: number,
}

export interface ProductWithStock extends Product {
    count: number,
}
