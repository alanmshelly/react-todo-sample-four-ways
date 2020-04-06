import {TodoRepo} from '../TodoRepo'
import {Route} from 'react-router-dom'
import {ClassContextTodoPage} from './class-context/ClassContextTodoPage'
import {ClassStateTodoPage} from './class-state/ClassStateTodoPage'
import {FunctionalContextTodoPage} from './functional-context/FunctionalContextTodoPage'
import {FunctionalStateTodoPage} from './functional-state/FunctionalStateTodoPage'
import React from 'react'
import {NavigationMenu} from './NavigationMenu'
import {PagePaths} from './PagePaths'

export interface RoutesProps {
    todoRepo: TodoRepo
}

export function Routes(props: RoutesProps) {
    const {todoRepo} = props
    return (
        <>
            <div>
                <NavigationMenu/>
            </div>
            <div>
                {
                    /**
                     * NOTE:
                     * I'm trying a pattern where the paths are all held in a PagePaths enum.
                     * See the PagePaths file for details.
                     */
                }
                <Route exact path={PagePaths.ClassContextTodoPage}>
                    <ClassContextTodoPage todoRepo={todoRepo}/>
                </Route>
                <Route exact path={PagePaths.ClassStateTodoPage}>
                    <ClassStateTodoPage todoRepo={todoRepo}/>
                </Route>
                <Route exact path={PagePaths.FunctionalContextTodoPage}>
                    <FunctionalContextTodoPage todoRepo={todoRepo}/>
                </Route>
                <Route exact path={PagePaths.FunctionalStateTodoPage}>
                    <FunctionalStateTodoPage todoRepo={todoRepo}/>
                </Route>
            </div>
        </>
    )
}