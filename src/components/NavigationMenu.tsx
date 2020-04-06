import React from 'react'
import {PagePaths} from './PagePaths'
import {Link, useLocation} from 'react-router-dom'

export function NavigationMenu() {
    /**
     * NOTE:
     * useLocation hook provided by react-router to get router props.
     * useHistory, useParams, useRouteMatch are also provided
     * https://reacttraining.com/react-router/web/api/Hooks
     *
     * These hooks allow us to not use render props which have to be passed from the parent component (Routes),
     * and can become messy.
     *
     * I don't have a render prop implementation as it exists too high up in the component hierarchy for both
     * implementations to co-exist.
     */
    const location = useLocation()

    return (
        <ul>
            <li>
                {
                    /**
                     * NOTE:
                     * If the `to` path were to have a param, we could use generatePath
                     * https://reacttraining.com/react-router/core/api/generatePath
                     */
                }
                <Link
                    to={PagePaths.ClassContextTodoPage}
                    className={location.pathname === PagePaths.ClassContextTodoPage ? 'selected' : ''}
                >
                    Class Component with Context
                </Link>
            </li>
            <li>
                <Link
                    to={PagePaths.ClassStateTodoPage}
                    className={location.pathname === PagePaths.ClassStateTodoPage ? 'selected' : ''}
                >
                    Class Component with State
                </Link>
            </li>
            <li>
                <Link
                    to={PagePaths.FunctionalContextTodoPage}
                    className={location.pathname === PagePaths.FunctionalContextTodoPage ? 'selected' : ''}
                >
                    Functional Component with Context
                </Link>
            </li>
            <li>
                <Link
                    to={PagePaths.FunctionalStateTodoPage}
                    className={location.pathname === PagePaths.FunctionalStateTodoPage ? 'selected' : ''}
                >
                    Functional Component with State
                </Link>
            </li>
        </ul>
    )
}