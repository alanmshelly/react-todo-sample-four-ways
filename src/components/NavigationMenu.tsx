import {Link, useLocation} from 'react-router-dom'
import React from 'react'

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
                <Link
                    to="/class-context"
                    className={location.pathname === "/class-context" ? 'selected' : ''}
                >
                    Class Component with Context
                </Link>
            </li>
            <li>
                <Link
                    to="/class-state"
                    className={location.pathname === "/class-state" ? 'selected' : ''}
                >
                    Class Component with State
                </Link>
            </li>
            <li>
                <Link
                    to="/functional-context"
                    className={location.pathname === "/functional-context" ? 'selected' : ''}
                >
                    Functional Component with Context
                </Link>
            </li>
            <li>
                <Link
                    to="/functional-state"
                    className={location.pathname === "/functional-state" ? 'selected' : ''}
                >
                    Functional Component with State
                </Link>
            </li>
        </ul>
    )
}