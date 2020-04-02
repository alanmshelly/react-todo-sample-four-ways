import React from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

interface Props {
    todoItems: TodoItem[]
    onDeleteItem: (id: number) => void
    todoRepo: TodoRepo
}

export function TodoItemListComponent(props: Props) {
    const {todoItems, onDeleteItem, todoRepo} = props

    return (
        <ul>
            {todoItems.map(todoItem =>
                <TodoItemComponent
                    key={todoItem.id}
                    todoRepo={todoRepo}
                    todoItem={todoItem}
                    onDeleteItem={onDeleteItem}
                />)}
        </ul>
    )
}

interface TodoItemComponentProps {
    todoItem: TodoItem
    onDeleteItem: (id: number) => void
    todoRepo: TodoRepo
}

function TodoItemComponent(props: TodoItemComponentProps) {
    const {todoItem, onDeleteItem, todoRepo} = props

    async function onDeleteButtonClick(id: number) {
        await todoRepo.deleteItem(id)
        onDeleteItem(id)
    }

    return (
        <li key={todoItem.id}>
            {todoItem.id}. {todoItem.text}
            <button onClick={() => onDeleteButtonClick(todoItem.id)}>x</button>
        </li>
    )
}