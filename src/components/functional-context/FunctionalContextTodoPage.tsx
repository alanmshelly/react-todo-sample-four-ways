import React from 'react'
import {TodoRepo} from '../../TodoRepo'
import {AddTodoItemFormComponent} from './AddTodoItemFormComponent'
import {TodoListContextProvider} from './TodoListContextProvider'
import {TodoItemListComponent} from './TodoItemListComponent'

interface Props {
    todoRepo: TodoRepo
}

export function FunctionalContextTodoPage(props: Props) {
    return (
        <TodoListContextProvider todoRepo={props.todoRepo}>
            <h1>Todo List (Functional/Context)</h1>
            <TodoItemListComponent/>
            <AddTodoItemFormComponent/>
        </TodoListContextProvider>
    )
}

