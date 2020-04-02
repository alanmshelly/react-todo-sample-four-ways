import React, {createRef, useContext} from 'react'
import {TodoListContext} from './TodoListContextProvider'

export function AddTodoItemFormComponent() {
    let textRef = createRef<HTMLInputElement>()

    const {dispatch} = useContext(TodoListContext)

    async function onAddButtonClick() {
        const textInput = textRef.current
        if (textInput === null) {
            return
        }
        dispatch({type: 'add', text: textInput.value})
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