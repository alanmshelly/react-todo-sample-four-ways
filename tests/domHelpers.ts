import {fireEvent, screen, within} from '@testing-library/react'
import {act} from 'react-dom/test-utils'


export async function clickDeleteButtonForTodoWithText(text: string) {
    const button = within(screen.getByText(text, {selector: 'li'}))
        .getByText('x', {selector: 'button'})
    await clickButton(button)
}

export function setInputValue(input: HTMLElement, value: string | number | null) {
    fireEvent.change(input, {target: {value}})
}

export async function clickButton(button: HTMLElement) {
    // act should be used whenever the page is updated or rendered (https://reactjs.org/docs/test-utils.html#act)
    // However, it is built into a lot of test-library functions so may sometimes be omitted.
    // I noticed that you almost always need to use it when using react hooks (useState, useEffect etc).
    await act(async () => {
        fireEvent.click(button)
    })
}