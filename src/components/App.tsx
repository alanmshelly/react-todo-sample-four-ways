import React from 'react'
import {LocalStorageTodoRepo} from '../LocalStorageTodoRepo'
import {BrowserRouter} from 'react-router-dom'
import {Routes} from './Routes'

export function App() {
    const todoRepo = new LocalStorageTodoRepo()

    return (
        <BrowserRouter>
            <Routes todoRepo={todoRepo}/>
        </BrowserRouter>
    )
}
