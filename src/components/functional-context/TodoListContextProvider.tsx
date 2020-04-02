import React, {createContext, FunctionComponent, ReactNode, useCallback, useEffect, useState} from 'react'
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

export const TodoListContextProvider: FunctionComponent<Props> = (props: Props) => {
    const {todoRepo, children} = props

    /* NOTE:
     * useReducer would be preferred here as it defines a dispatch function for us. Unfortunately useReducer doesn't
     * work with async functions which we need if we want to handle race conditions.
     */
    const [todoItems, updateTodoItems] = useState<TodoItem[]>([])

    /* NOTE:
     * This is a custom hook
     */
    const dispatch = useTodoDispatch(todoRepo, updateTodoItems)

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

function useTodoDispatch(todoRepo: TodoRepo, updateTodoItems: (value: (((prevState: TodoItem[]) => TodoItem[]) | TodoItem[])) => void) {
    /* NOTE:
     * I used useCallback to generate the dispatch function as otherwise the dispatch function will be recreated every
     * time todoItems is updated. This in turn lets me only call dispatch the first time the component loads using the
     * useEffect hook.
     */
    return useCallback(
        function dispatch(action: TodoItemsReducerAction) {
            switch (action.type) {
                case 'add':
                    todoRepo.addItem(action.text)
                        .then(addedItem => {
                            updateTodoItems(todoItems =>
                                [...todoItems, addedItem],
                            )
                        })
                    break
                case 'load':
                    todoRepo.getItems()
                        .then(loadedTodoItems => {
                            updateTodoItems(loadedTodoItems)
                        })
                    break
                case 'delete':
                    todoRepo.deleteItem(action.id)
                        .then(() => {
                            updateTodoItems(todoItems =>
                                todoItems.filter(todoItem => todoItem.id !== action.id),
                            )
                        })
                    break
            }
        },
        [todoRepo, updateTodoItems],
    )
}