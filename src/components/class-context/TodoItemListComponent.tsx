import React from 'react'
import {TodoListContext} from './TodoListContextProvider'
import {TodoItem} from '../../TodoRepo'

export class TodoItemListComponent extends React.Component {
    render() {
        return (
            <ul>
                {
                    /* NOTE:
                     * This is one way of using the context
                     */
                }
                <TodoListContext.Consumer>
                    {(context) =>
                        context.todoItems.map(todoItem => <TodoItemComponent key={todoItem.id} todoItem={todoItem}/>)
                    }
                </TodoListContext.Consumer>
            </ul>
        )
    }
}

class TodoItemComponent extends React.Component<{ todoItem: TodoItem }> {
    /* NOTE:
     * This is another way of using the context. You are limited to one context per component using this method.
     */
    static contextType = TodoListContext

    async onDeleteButtonClick(id: number) {
        await this.context.dispatch({
            type: 'delete',
            id,
        })
    }

    render() {
        const {todoItem} = this.props

        return (
            <li key={todoItem.id}>
                {todoItem.id}. {todoItem.text}
                <button onClick={() => this.onDeleteButtonClick(todoItem.id)}>x</button>
            </li>
        )
    }
}