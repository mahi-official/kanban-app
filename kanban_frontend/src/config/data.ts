const data: {[key: string] : any } = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Anything in the List 1'},
        'task-2': {id: 'task-2', content: 'Anything in the List 2'},
        'task-3': {id: 'task-3', content: 'Anything in the List 3'},
        'task-4': {id: 'task-4', content: 'Anything in the List 4'},
        'task-5': {id: 'task-5', content: 'Anything in the List 5'},
    },
    boards:{
        'board-1': {id: 'board-1', title: 'Bold Title of Board', taskIds:['task-1', 'task-2', 'task-3', 'task-4', 'task-5']},
        'board-2': {id: 'board-2', title: 'Small Title', taskIds:[]},
    },
    columnOrder:['board-1', 'board-2'],
};

export default data;