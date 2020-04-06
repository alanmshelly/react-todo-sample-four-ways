import React from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'
import {TodoItemListComponent} from './TodoItemListComponent'
import {AddTodoItemFormComponent} from './AddTodoItemFormComponent'

interface Props {
    todoRepo: TodoRepo
}

interface State {
    todoItems: TodoItem[]
}

export class ClassStateTodoPage extends React.Component<Props, State> {
    state = {
        todoItems: [],
    }

    async componentDidMount(): Promise<void> {
        const todoItems = await this.props.todoRepo.getItems()
        this.setState({todoItems})
    }

    onDeleteItem(id: number) {
        const todoItemsWithItemRemoved = this.state.todoItems.filter((todoItem: TodoItem) => todoItem.id !== id)
        this.setState({todoItems: todoItemsWithItemRemoved})
    }

    onAddItem(newTodoItem: TodoItem) {
        this.setState({todoItems: [...this.state.todoItems, newTodoItem]})
    }

    render() {
        const {todoRepo} = this.props
        const {todoItems} = this.state
        return (
            <div>
                <h1>Todo List (Class/State)</h1>
                {
                    /**
                     * NOTE:
                     * You need to pass a callback to update the state.
                     * Whether you call the repo in this class or pass it down to be used in the handlers at
                     * lower levels depends on where you think the logic should be held.
                     */
                }
                <TodoItemListComponent
                    todoItems={todoItems}
                    todoRepo={todoRepo}
                    onDeleteItem={this.onDeleteItem.bind(this)}
                />
                <AddTodoItemFormComponent
                    todoRepo={todoRepo}
                    onAddItem={this.onAddItem.bind(this)}
                />
            </div>
        )
    }
}

