import React from 'react'
import {TodoRepo} from '../../TodoRepo'
import {AddTodoItemFormComponent} from './AddTodoItemFormComponent'
import {TodoListContextProvider} from './TodoListContextProvider'
import {TodoItemListComponent} from './TodoItemListComponent'

interface Props {
    todoRepo: TodoRepo
}

export class ClassContextTodoPage extends React.Component<Props> {
    render() {
        return (
            <TodoListContextProvider todoRepo={this.props.todoRepo}>
                <h1>Todo List (Class/Context)</h1>
                {
                    /* NOTE:
                     * Since we're using context, we don't need to pass the todoItems and todoRepo
                     * as props at every single layer.
                     */
                }
                <TodoItemListComponent/>
                <AddTodoItemFormComponent/>
            </TodoListContextProvider>
        )
    }
}

