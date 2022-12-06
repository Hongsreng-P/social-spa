export interface Post {
    id: number,
    author: string,
    title: string,
    description: string,
}

export interface NavItemData {
    route: string,
    itemName: string,
}

export interface LoginCredential {
    username: string,
    password: string,
}

export interface UserInfo {
    id: number,
    username: string,
    role: string,
    info: {
        id: number,
        address: string,
        age: number
    }
}

export interface EditPostData {
    title: string,
    description: string,
}

export interface AddNewPostData extends EditPostData {}

export interface Message {
    author: string;
    content: string;
}