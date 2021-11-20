import axios from './../config/axios';

export default interface TaskInstance {
    id: string;
    content: string;
    board: string;
}

interface ServerResponse {
    count: number;
    next?: string;
    previous?: string;
    results: TaskInstance[];
}

const getTasks = async() => {
    const data = await axios.get<ServerResponse>('/tasks/')
        .then((response) => {
            if (response.status === 200) {
                return response.data.results
            }
        })
    return data;
}

const createTask = async(board: string, content: string) => {
    const data = await axios.post<TaskInstance>('/tasks/', {"content" : content, "board": board})
        .then((response) => {
            if (response.status === 201) {
                return response.data
            }
        })
    return data;
}

const updateTask = async(id: string, content: string) => {
    const data = await axios.put<TaskInstance>(`/tasks/${id}/`, {"content" : content})
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    return data;
}

const moveTask = async(id: string, board: string) => {
    const data = await axios.put<TaskInstance>(`/tasks/${id}/`, {"board" : board})
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

const deleteTask = async(id: string) => {
    const data = await axios.delete<TaskInstance>(`/tasks/${id}/`)
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

export {getTasks, createTask, updateTask, moveTask, deleteTask}