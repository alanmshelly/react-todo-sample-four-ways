import React from 'react'
import {LocalStorageTodoRepo} from '../../src/LocalStorageTodoRepo'
import Sinon from 'sinon'
import {TodoItem, TodoRepo} from '../../src/TodoRepo'
import {getByLabelText, getByText, wait} from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import {renderRoutesAtPath} from '../renderHelpers'
import {createDelayedPromise, DelayedPromise}from 'delay-promises'
import {clickButton, clickDeleteButtonForTodoWithText, setInputValue} from '../domHelpers'

let stubTodoRepo: Sinon.SinonStubbedInstance<TodoRepo>
let getItemsDelayedPromise: DelayedPromise<TodoItem[]>
let addItemDelayedPromise: DelayedPromise<TodoItem>
beforeEach(async () => {
    stubTodoRepo = Sinon.createStubInstance(LocalStorageTodoRepo)

    getItemsDelayedPromise = createDelayedPromise()
    stubTodoRepo.getItems.returns(getItemsDelayedPromise)

    addItemDelayedPromise = createDelayedPromise()
    stubTodoRepo.addItem.returns(addItemDelayedPromise)

    stubTodoRepo.deleteItem.resolves()
})

it('should show page title', async () => {
    getItemsDelayedPromise.resolve([])


    const container = await renderFunctionalStateTodoPage(stubTodoRepo)


    await wait(() => expect(container).toHaveTextContent('Todo List (Functional/State)'))
})

it('should show retrieved todo items', async () => {
    getItemsDelayedPromise.resolve([
        {
            id: 100,
            text: 'todo item 100',
        },
        {
            id: 101,
            text: 'todo item 101',
        },
    ])
    const container = await renderFunctionalStateTodoPage(stubTodoRepo)


    expect(container).toHaveTextContent('100. todo item 100')
    expect(container).toHaveTextContent('101. todo item 101')
})

describe('Adding a todo', () => {
    let textInput: HTMLElement
    let addButton: HTMLElement
    let container: HTMLElement
    beforeEach(async () => {
        getItemsDelayedPromise.resolve([])
        addItemDelayedPromise.resolve({
            id: 1,
            text: 'returned text',
        })
        container = await renderFunctionalStateTodoPage(stubTodoRepo)

        textInput = getByLabelText(container, 'Todo Item Text', {selector: 'input'})
        setInputValue(textInput, 'new item text')

        addButton = getByText(container, 'Add', {selector: 'button'})
    })

    it('should send a request to add a todo item when Add is clicked', async () => {
        await clickButton(addButton)


        Sinon.assert.calledWithExactly(stubTodoRepo.addItem, 'new item text')
    })

    it('should show newly added todo item when add succeeds', async () => {
        await clickButton(addButton)


        expect(container).toHaveTextContent('1. returned text')
    })

    it('should clear the input when the add button is clicked', async () => {
        expect(textInput).toHaveValue('new item text')
        await clickButton(addButton)


        expect(textInput).toHaveValue('')
    })
})

describe('delete todo item', () => {
    const todoItemToDeleteText = '101. todo item 101'
    let container: HTMLElement
    beforeEach(async () => {
        getItemsDelayedPromise.resolve([
            {
                id: 100,
                text: 'todo item 100',
            },
            {
                id: 101,
                text: 'todo item 101',
            },
        ])


        container = await renderFunctionalStateTodoPage(stubTodoRepo)
        await clickDeleteButtonForTodoWithText(todoItemToDeleteText)
    })

    it('should send a request to delete when the x button is clicked', async () => {
        Sinon.assert.calledWithExactly(stubTodoRepo.deleteItem, 101)
    })

    it('should delete the deleted todo item from the page', async () => {
        expect(container).not.toHaveTextContent(todoItemToDeleteText)
    })
})
describe('asynchronous actions', () => {
    describe('when there are multiple deletes in a row', () => {
        it('should delete from the screen when the delete function resolves', async () => {
            getItemsDelayedPromise.resolve([
                {
                    id: 100,
                    text: 'todo item 100',
                },
                {
                    id: 101,
                    text: 'todo item 101',
                },
            ])


            const container = await renderFunctionalStateTodoPage(stubTodoRepo)

            const firstDeleteDelayedPromise = createDelayedPromise<void>()
            stubTodoRepo.deleteItem.onFirstCall().returns(firstDeleteDelayedPromise)
            const secondDeleteDelayedPromise = createDelayedPromise<void>()
            stubTodoRepo.deleteItem.onSecondCall().returns(secondDeleteDelayedPromise)


            const todoItem100Text = '100. todo item 100'
            const todoItem101Text = '101. todo item 101'

            await clickDeleteButtonForTodoWithText(todoItem100Text)
            await clickDeleteButtonForTodoWithText(todoItem101Text)

            expect(container).toHaveTextContent(todoItem100Text)
            expect(container).toHaveTextContent(todoItem101Text)

            await act(async () => {
                firstDeleteDelayedPromise.resolve()
            })

            expect(container).not.toHaveTextContent(todoItem100Text)
            expect(container).toHaveTextContent(todoItem101Text)

            await act(async () => {
                secondDeleteDelayedPromise.resolve()
            })

            expect(container).not.toHaveTextContent(todoItem100Text)
            expect(container).not.toHaveTextContent(todoItem101Text)
        })
    })

    describe('when there are multiple adds in a row', () => {
        it('should add to the screen', async () => {
            getItemsDelayedPromise.resolve([])


            const container = await renderFunctionalStateTodoPage(stubTodoRepo)

            const firstAddDelayedPromise = createDelayedPromise<TodoItem>()
            stubTodoRepo.addItem.onFirstCall().returns(firstAddDelayedPromise)
            const secondAddDelayedPromise = createDelayedPromise<TodoItem>()
            stubTodoRepo.addItem.onSecondCall().returns(secondAddDelayedPromise)


            const todoItem100Text = '100. todo item 100'
            const todoItem101Text = '101. todo item 101'

            const textInput = getByLabelText(container, 'Todo Item Text', {selector: 'input'})
            const addButton = getByText(container, 'Add', {selector: 'button'})
            setInputValue(textInput, 'new item text')
            await clickButton(addButton)
            setInputValue(textInput, 'new item text')
            await clickButton(addButton)

            expect(container).not.toHaveTextContent(todoItem100Text)
            expect(container).not.toHaveTextContent(todoItem101Text)

            await act(async () => {
                firstAddDelayedPromise.resolve({
                    id: 100,
                    text: 'todo item 100',
                })
            })

            expect(container).toHaveTextContent(todoItem100Text)
            expect(container).not.toHaveTextContent(todoItem101Text)

            await act(async () => {
                secondAddDelayedPromise.resolve({
                    id: 101,
                    text: 'todo item 101',
                })
            })

            expect(container).toHaveTextContent(todoItem100Text)
            expect(container).toHaveTextContent(todoItem101Text)
        })
    })
})

function renderFunctionalStateTodoPage(todoRepo: TodoRepo) {
    /**
     * NOTE:
     * Route params can be set using generatePath.
     *
     * A string is being used for the path instead of the PagePaths enum in order to detect unexpected changes to the path.
     */
    return renderRoutesAtPath('/functional-state', {todoRepo})
}
