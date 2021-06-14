import axios from 'axios'

export const baseURL = 'https://jordan.ashton.fashion/api/goods/30/comments'

export const API = {
    getCommentsByUrl: (url: string) => {
        return axios.get<CommentsDataType>(url).then(res => res.data)
    },
    getCommentsByPage: (page: number) => {
        return axios.get<CommentsDataType>(`${baseURL}?page=${page}`).then(res => res.data)
    },
    sendComment: (name: string, text: string) => {
        return axios.post(baseURL, {name, text}).then(res => res)
    }
}

export type CommentsType = {
    name: string
    id: number
    text: string
    visible: number
    product_id: number
    created_at: string
    updated_at: string
}

export type CommentsDataType = {
    data: CommentsType[]
    current_page: number
    first_page_url: string
    from: number
    last_page_url: string
    last_page: number
    links: []
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}