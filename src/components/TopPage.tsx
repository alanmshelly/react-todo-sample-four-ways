import {Link} from 'react-router-dom'
import React from 'react'

export function TopPage() {
    return (
        <ul>
            <li><Link to="/class-context">Class Component with Context</Link></li>
            <li><Link to="/class-state">Class Component with State</Link></li>
            <li><Link to="/functional-context">Functional Component with Context</Link></li>
            <li><Link to="/functional-state">Functional Component with State</Link></li>
        </ul>
    )
}