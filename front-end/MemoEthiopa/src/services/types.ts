export type noteType = {  
    user: number
    title: string
    content:string,
    image: null | any,
    file: null | any,
    color: null | string,
    is_pinned: boolean,
    is_archived: boolean,
    category: number,
    folder:number | null,
    is_trashed:boolean,
}

export type loginType = {
    username?:string,
    email?:string,
    password: string
}

export type singupType = {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
}