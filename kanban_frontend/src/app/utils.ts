import BoardInstance from "../apis/BoardAPI"
import TaskInstance from "../apis/TaskAPI"

type groupProps = {
    boards: BoardInstance[]
    tasks: TaskInstance[]
}

export default function GroupTasks(props: groupProps){
    let order: { [key: string]: string[] }[] = []

    props.boards.forEach(b => {
        order.push({ [b.id] : props.tasks.filter(t => t.board === b.id).map(t => t.id)})
    })
    
    return order
}