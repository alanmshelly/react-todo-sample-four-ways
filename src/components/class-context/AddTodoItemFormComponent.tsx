import React, {createRef, useContext} from 'react'
import {TodoListContext} from './TodoListContextProvider'

export class AddTodoItemFormComponent extends React.Component {
    textRef = createRef<HTMLInputElement>()

    onAddButtonClick() {
        const textInput = this.textRef.current
        if (textInput === null) {
            return
        }

        const {dispatch} = useContext(TodoListContext)
        dispatch({type: 'add', text: textInput.value})
        textInput.value = ''
    }

    render() {
        return (
            <div>
                <label>
                    Todo Item Text
                    <input ref={this.textRef}/>
                </label>
                <button onClick={this.onAddButtonClick.bind(this)}>
                    Add
                </button>
            </div>
        )
    }
}