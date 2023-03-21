import React from 'react';
import TodoItem from '../TodoItem';

const TodoList = (props) => {
    return (
        <div>
            {props.todos.map(td => <TodoItem item={td} key={td._id} />)}
        </div>
    );
}

export default TodoList;