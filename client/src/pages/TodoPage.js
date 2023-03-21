import React, {useEffect} from 'react';
import TodoList from '../components/TodoList';
import ToDoForm from '../components/TodoForm';
import { getTasksRequest, createTaskRequest, deleteTaskRequest } from '../actions/actionCreator';
import {connect} from 'react-redux';

const TodoPage = (props) => {
    useEffect(() => {
        props.getTasksRequest();
    }, []);

    const getNewTd = (data) => {
        props.createTaskRequest({
            status: 'new',
            ...data
        })
    }

    const delTask = (id) => {
        props.deleteTaskRequest(id);
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <ToDoForm sendData={getNewTd} />
            <TodoList todos={props.tasks} delCallback={delTask} />
        </div>
    );
}

const mapStateToProps = ({tasks}) => ({tasks});

const mapDispatchToProps = {
    getTasksRequest,
    createTaskRequest,
    deleteTaskRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);