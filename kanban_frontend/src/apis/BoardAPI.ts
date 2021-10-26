import axios from './../config/axios';
import TaskInstance from './TaskAPI';

interface BoardInstance {
    id: string;
    title: string;
    tasks?: TaskInstance[]
}
export default BoardInstance;

interface ServerResponse {
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
        .catch((e) => {
            console.error(e);
            return [];
        });
    return data;
}

const createBoard = async(title: string) => {
    const data = await axios.post<BoardInstance>('/boards/', {"title" : title})
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
        .catch((e) => {
            console.error(e);
            return {}
        });
    return data;
}

const updateBoard = async(id: string, title: string) => {
    const data = await axios.put<BoardInstance>(`/boards/${id}/`, {"title" : title})
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
        .catch((e) => {
            console.error(e);
            return [];
        });
    return data;
}

const deleteBoard = async(id: string) => {
    const data = await axios.delete<BoardInstance>(`/boards/${id}/`)
        .then((response) => {
            if (response.status === 200) {
                return;
            }
        })
        .catch((e) => {
            console.error(e);
            return;
        });
    return data;
}

export {getBoards, createBoard, updateBoard, deleteBoard}