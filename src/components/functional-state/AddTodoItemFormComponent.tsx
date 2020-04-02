import React, {createRef} from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

interface Props {
    onAddItem: (newTodoItem: TodoItem) => void
    todoRepo: TodoRepo
}

export function AddTodoItemFormComponent(props: Props) {
    let textRef = createRef<HTMLInputElement>()

    async function onAddButtonClick() {
        const textInput = textRef.current
        if (textInput === null) {
            return
        }
        const {onAddItem, todoRepo} = props
        const newTodoItem = await todoRepo.addItem(textInput.value)
        textInput.value = ''

        onAddItem(newTodoItem)
    }

    return (
        <div>
            <label>
                Todo Item Text
                <input ref={textRef}/>
            </label>
            <button onClick={onAddButtonClick}>
                Add
            </button>
        </div>
    )
}