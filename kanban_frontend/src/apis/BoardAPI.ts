import axios from './../config/axios';

export default interface BoardInstance {
    id: string
    title: string
}

type ServerResponse = {
    count: number;
    next?: string;
    previous?: string;
    results: BoardInstance[];
}

const getBoards = async() => {
    const data = await axios.get<ServerResponse>('/boards/')
        .then((response) => {
            if (response.status === 200) {
                return response.data.results
            }
        })
    return data;
}

const createBoard = async(title: string) => {
    const data = await axios.post<BoardInstance>('/boards/', {"title" : title})
        .then((response) => {
            if (response.status === 201) {
                return response.data
            }
        })
    return data;
}

const updateBoard = async(id: string, title: string) => {
    const data = await axios.put<BoardInstance>(`/boards/${id}/`, {"title" : title})
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    return data;
}

const deleteBoard = async(id: string) => {
    const data = await axios.delete<BoardInstance>(`/boards/${id}/`)
        .then((response) => {
            if (response.status === 200) {
                return;
            }
        })
    return data;
}

export {getBoards, createBoard, updateBoard, deleteBoard}