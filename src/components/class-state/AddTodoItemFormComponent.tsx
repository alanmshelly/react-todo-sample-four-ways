import {TodoItem, TodoRepo} from '../../TodoRepo'
import React, {createRef} from 'react'

interface AddTodoItemFormComponentProps {
    onAddItem: (newTodoItem: TodoItem) => void
    todoRepo: TodoRepo
}

export class AddTodoItemFormComponent extends React.Component<AddTodoItemFormComponentProps> {
    textRef = createRef<HTMLInputElement>()

    async onAddButtonClick() {
        const textInput = this.textRef.current
        if (textInput === null) {
            return
        }
        const {onAddItem, todoRepo} = this.props
        const newTodoItem = await todoRepo.addItem(textInput.value)
        textInput.value = ''

        onAddItem(newTodoItem)
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