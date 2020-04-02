import React from 'react'
import {TodoRepo} from '../../TodoRepo'
import {AddTodoItemFormComponent} from './AddTodoItemFormComponent'
import {TodoListContextProvider} from './TodoListContextProvider'
import {TodoItemListComponent} from './TodoItemListComponent'

interface Props {
    todoRepo: TodoRepo
}

export function FunctionalContextTodoPage(props: Props) {
    const todoRepo = props.todoRepo

    return (
        <TodoListContextProvider todoRepo={todoRepo}>
            <h1>Todo List</h1>
            <TodoItemListComponent/>
            <AddTodoItemFormComponent/>
        </TodoListContextProvider>
    )
}

