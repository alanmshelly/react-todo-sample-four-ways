import React, {
    createContext,
    Dispatch,
    FunctionComponent,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

export const TodoListContext = createContext<{ todoItems: TodoItem[], dispatch: (action: TodoItemsReducerAction) => void }>({
    todoItems: [],
    dispatch: () => undefined,
})

type TodoItemsReducerAction =
    { type: 'add', text: string } |
    { type: 'load' } |
    { type: 'delete', id: number }


function createDispatchFunction(todoRepo: TodoRepo, updateTodoItems: Dispatch<SetStateAction<TodoItem[]>>) {
    return function dispatch(action: TodoItemsReducerAction) {
        (async () => {
            switch (action.type) {
                case 'add':
                    const addedItem = await todoRepo.addItem(action.text)
                    updateTodoItems(todoItems =>
                        [...todoItems, addedItem],
                    )
                    return
                case 'load':
                    const loadedTodoItems = await todoRepo.getItems()
                    updateTodoItems(loadedTodoItems)
                    return
                case 'delete':
                    await todoRepo.deleteItem(action.id)
                    updateTodoItems(todoItems =>
                        todoItems.filter(todoItem => todoItem.id !== action.id),
                    )
                    return
            }
        })()
    }
}

interface Props {
    todoRepo: TodoRepo
    children?: ReactNode
}

export const TodoListContextProvider: FunctionComponent<Props> = (props: Props) => {
    const {todoRepo, children} = props

    /* NOTE:
     * useReducer would be preferred here as it defines a dispatch function for us. Unfortunately useReducer doesn't
     * work with async functions which we need if we want to handle race conditions.
     */
    const [todoItems, updateTodoItems] = useState<TodoItem[]>([])

    /* NOTE:
     * I used useCallback to generate the dispatch function as otherwise the dispatch function will be recreated every
     * time todoItems is updated. This in turn lets me only call dispatch the first time the component loads using the
     * useEffect hook.
     */
    const dispatch = useCallback(
        createDispatchFunction(todoRepo, updateTodoItems),
        [todoRepo, updateTodoItems],
    )

    /* NOTE:
     * You can name hook callbacks for readability :)
     */
    useEffect(function loadTodoItems() {
        dispatch({type: 'load'})
    }, [dispatch])

    return (
        <TodoListContext.Provider value={{todoItems, dispatch}}>
            {children}
        </TodoListContext.Provider>
    )
}
