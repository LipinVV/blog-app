export type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: number,
    },
    geo?: {
        lat: number,
        lng: number,
    },
    phone: number,
    website: string,
    company: {
        name: string,
        catchphrase: string,
        bs: string,
    }
}

export type PostType = {
    id: number,
    title: string,
    body: string,
    postId: number,
    userName: string
}

export type CommentType = {
    id: number,
    name: string,
    email: string,
    body: string
}

export type StateType = {
    users: UserType[],
    posts: PostType[],
    comments: CommentType[],
}
