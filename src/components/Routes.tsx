import {TodoRepo} from '../TodoRepo'
import {Route} from 'react-router-dom'
import {ClassContextTodoPage} from './class-context/ClassContextTodoPage'
import {ClassStateTodoPage} from './class-state/ClassStateTodoPage'
import {FunctionalContextTodoPage} from './functional-context/FunctionalContextTodoPage'
import {FunctionalStateTodoPage} from './functional-state/FunctionalStateTodoPage'
import React from 'react'
import {TopPage} from './TopPage'

export interface RoutesProps {
    todoRepo: TodoRepo
}

export function Routes(props: RoutesProps) {
    const {todoRepo} = props
    return (
        <>
            <Route exact path="/">
                <TopPage/>
            </Route>
            <Route exact path="/class-context">
                <ClassContextTodoPage todoRepo={todoRepo}/>
            </Route>
            <Route exact path="/class-state">
                <ClassStateTodoPage todoRepo={todoRepo}/>
            </Route>
            <Route exact path="/functional-context">
                <FunctionalContextTodoPage todoRepo={todoRepo}/>
            </Route>
            <Route exact path="/functional-state">
                <FunctionalStateTodoPage todoRepo={todoRepo}/>
            </Route>
        </>
    )
}