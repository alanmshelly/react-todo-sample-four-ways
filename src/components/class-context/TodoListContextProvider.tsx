import React, {createContext, ReactNode} from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

export const TodoListContext = createContext<{ todoItems: TodoItem[], dispatch: (action: TodoItemsReducerAction) => void }>({
    todoItems: [],
    dispatch: () => undefined,
})

type TodoItemsReducerAction =
    { type: 'add', text: string } |
    { type: 'load' } |
    { type: 'delete', id: number }

interface Props {
    todoRepo: TodoRepo
    children?: ReactNode
}

interface State {
    todoItems: TodoItem[]
}

/**
  * NOTE:
 * This component wraps the context and manages the todoItems in the component's state.
 * The context provides the todoItems as well as a dispatch function to manipulate the state.
 */
export class TodoListContextProvider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            todoItems: [],
        }
    }

    async componentDidMount(): Promise<void> {
        this.dispatch({type: 'load'})
    }

    /**
  * NOTE:
     * Management of todoItems is simple since all changes to the state are handled in one place. You could also split
     * this into multiple functions but I started implementing using a reducer pattern so it ended up like this.
     *
     * This implementation puts the async repo calls in the dispatch so a true reducer could not be used.
     * See the functional-context implementation for a
     */
    async dispatch(action: TodoItemsReducerAction) {
        const {todoRepo} = this.props
        switch (action.type) {
            case 'add':
                const addedItem = await todoRepo.addItem(action.text)
                this.setState({
                    todoItems: [...this.state.todoItems, addedItem],
                })
                return
            case 'load':
                const loadedTodoItems = await todoRepo.getItems()
                this.setState({todoItems: loadedTodoItems})
                return
            case 'delete':
                await todoRepo.deleteItem(action.id)
                this.setState({
                    todoItems: this.state.todoItems.filter(todoItem => todoItem.id !== action.id),
                })
                return
        }
    }

    render() {
        const {children} = this.props

        return (
            <TodoListContext.Provider value={{
                todoItems: this.state.todoItems,
                dispatch: this.dispatch.bind(this),
            }}>
                {children}
            </TodoListContext.Provider>
        )
    }
}
