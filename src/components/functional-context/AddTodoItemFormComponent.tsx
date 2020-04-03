import React, {createRef, useContext} from 'react'
import {TodoListContext} from './TodoListContextProvider'

export function AddTodoItemFormComponent() {
    let textRef = createRef<HTMLInputElement>()

    const {dispatch, todoRepo} = useContext(TodoListContext)

    async function onAddButtonClick() {
        const textInput = textRef.current
        if (textInput === null) {
            return
        }
        const todoItem = await todoRepo.addItem(textInput.value)
        dispatch({type: 'add', todoItem})
        textInput.value = ''
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