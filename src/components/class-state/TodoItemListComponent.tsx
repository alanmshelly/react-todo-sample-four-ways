import React from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

interface TodoItemListComponentProps {
    todoItems: TodoItem[]
    onDeleteItem: (id: number) => void
    todoRepo: TodoRepo
}

export class TodoItemListComponent extends React.Component<TodoItemListComponentProps> {
    render() {
        const {todoItems, onDeleteItem, todoRepo} = this.props

        return (
            <ul>
                {todoItems.map(todoItem =>
                    /**
                     * NOTE:
                     * props need to be passed again. This is a simple case but for more complex components,
                     * many layers is imaginable.
                     */
                    <TodoItemComponent
                        key={todoItem.id}
                        todoRepo={todoRepo}
                        todoItem={todoItem}
                        onDeleteItem={onDeleteItem}
                    />)}
            </ul>
        )
    }
}

interface TodoItemComponentProps {
    todoItem: TodoItem
    onDeleteItem: (id: number) => void
    todoRepo: TodoRepo
}

class TodoItemComponent extends React.Component<TodoItemComponentProps> {
    async onDeleteButtonClick(id: number) {
        const {onDeleteItem, todoRepo} = this.props
        await todoRepo.deleteItem(id)
        onDeleteItem(id)
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