import React, {useEffect, useState} from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'
import {AddTodoItemFormComponent} from './AddTodoItemFormComponent'
import {TodoItemListComponent} from './TodoItemListComponent'

interface Props {
    todoRepo: TodoRepo
}

/* NOTE:
 * Not too much different from using class + state other than the hooks syntax
 */
export function FunctionalStateTodoPage(props: Props) {
    const todoRepo = props.todoRepo
    const [todoItems, updateTodoItems] = useState<TodoItem[]>([])
    useEffect(() => {
        todoRepo.getItems().then(updateTodoItems)
    }, [todoRepo])

    function onDeleteItem(id: number) {
        updateTodoItems(todoItems => todoItems.filter(todoItem => todoItem.id !== id))
    }

    function onAddItem(newTodoItem: TodoItem) {
        updateTodoItems(todoItems => [...todoItems, newTodoItem])
    }

    return (
        <div>
            <h1>Todo List (Functional/State)</h1>
            <TodoItemListComponent todoItems={todoItems} todoRepo={todoRepo} onDeleteItem={onDeleteItem}/>
            <AddTodoItemFormComponent todoRepo={todoRepo} onAddItem={onAddItem}/>
        </div>
    )
}

