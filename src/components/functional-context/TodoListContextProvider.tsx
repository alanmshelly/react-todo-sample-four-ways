import React, {createContext, FunctionComponent, ReactNode, useEffect, useReducer} from 'react'
import {TodoItem, TodoRepo} from '../../TodoRepo'

type TodoListContextType = {
    todoItems: TodoItem[],
    dispatch: (action: TodoItemsReducerAction) => void,
    todoRepo: TodoRepo,
}
export const TodoListContext = createContext<TodoListContextType>({
    todoItems: [],
    dispatch: () => undefined,
    todoRepo: {} as any,
})

/**
  * NOTE:
 * Typescript is smart enough that it will give a lint error if a payload doesn't match a type.
 * You can use enums for the type as well but I found it makes it very long (TodoItemsReducerActionType.ADD).
 */
type TodoItemsReducerAction =
    { type: 'add', todoItem: TodoItem } |
    { type: 'set', todoItems: TodoItem[] } |
    { type: 'delete', id: number }

interface Props {
    todoRepo: TodoRepo
    children?: ReactNode
}

/**
  * NOTE:
 * Define reducer outside of the component so it doesn't get redefined every time the component is updated.
 */
function reducer(state: TodoItem[], action: TodoItemsReducerAction) {
    switch (action.type) {
        case 'add':
            return [...state, action.todoItem]
        case 'set':
            return action.todoItems
        case 'delete':
            return state.filter(todoItem => todoItem.id !== action.id)
    }
}

export const TodoListContextProvider: FunctionComponent<Props> = (props: Props) => {
    const {todoRepo, children} = props

    /**
  * NOTE:
     * Built-in useReducer hook simplifies using reducers
     */
    const [todoItems, dispatch] = useReducer(reducer, [])

    /**
  * NOTE:
     * You can name hook callbacks for readability :)
     */
    useEffect(function loadTodoItems() {
        todoRepo.getItems()
            .then(todoItems => dispatch({type: 'set', todoItems}))
    }, [todoRepo])

    /**
  * NOTE:
     * Passing the todoRepo in the context so that each component can handle the async API calls.
     * See the class-context implementation for when the repo calls are handled in the dispatch function.
     *
     * If you want to do the repo calls in this component, you will need to define the dispatch function using
     * the useCallback hook so there isn't a loop where the context continuously updates.
     *
     * ```
     * const dispatch = useCallback(
     *     function dispatch(action: TodoItemsReducerAction) {
     *         switch (action.type) {
     *             case 'add':
     *                 todoRepo.addItem(action.text)
     *                     .then(addedItem => {
     *                         updateTodoItems(todoItems =>
     *                             [...todoItems, addedItem],
     *                         )
     *                     })
     *                 break
     *             case 'load':
     *                 todoRepo.getItems()
     *                     .then(loadedTodoItems => {
     *                         updateTodoItems(loadedTodoItems)
     *                     })
     *                 break
     *             case 'delete':
     *                 todoRepo.deleteItem(action.id)
     *                     .then(() => {
     *                         updateTodoItems(todoItems =>
     *                             todoItems.filter(todoItem => todoItem.id !== action.id),
     *                         )
     *                     })
     *                 break
     *         }
     *     },
     *     [todoRepo, updateTodoItems],
     * )
     * ```
     */
    return (
        <TodoListContext.Provider value={{todoItems, dispatch, todoRepo}}>
            {children}
        </TodoListContext.Provider>
    )
}