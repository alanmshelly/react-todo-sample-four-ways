import React, {useContext} from 'react'
import {TodoListContext} from './TodoListContextProvider'
import {TodoItem} from '../../TodoRepo'

export function TodoItemListComponent() {
    /* NOTE:
     * Hooks make it really simple and clean to use context
     */
    const {todoItems} = useContext(TodoListContext)

    return (
        <ul>
            {todoItems.map(todoItem => <TodoItemComponent key={todoItem.id} todoItem={todoItem}/>)}
        </ul>
    )
}

function TodoItemComponent(props: { todoItem: TodoItem }) {
    const {todoItem} = props
    const {dispatch} = useContext(TodoListContext)

    async function onDeleteButtonClick(id: number) {
        dispatch({
            type: 'delete',
            id,
        })
    }

    return (
        <li key={todoItem.id}>
            {todoItem.id}. {todoItem.text}
            <button onClick={() => onDeleteButtonClick(todoItem.id)}>x</button>
        </li>
    )
}