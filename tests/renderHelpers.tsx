import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import {Routes, RoutesProps} from '../src/components/Routes'
import {StaticRouter} from 'react-router-dom'

export async function renderRoutesAtPath(path: string, props: Partial<RoutesProps>) {
    const dummyProp: any = undefined
    const allProps: RoutesProps = {
        todoRepo: props.todoRepo ?? dummyProp,
    }

    let renderResult: RenderResult | null = null
    /* NOTE:
     * act should be used whenever the page is updated or rendered (https://reactjs.org/docs/test-utils.html#act)
     * However, it is built into a lot of test-library functions so may sometimes be omitted.
     * I noticed that you almost always need to use it when using react hooks (useState, useEffect etc).
     */
    await act(async () => {
        /* NOTE:
         * I test by rendering through the Routes component as it lets me test including the path, giving me a lot of
         * confidence. This setup also injects dummies into the props by default which helps ensure nothing unnecessary
         * is being used.
         * It also always renders the component in a Router so you don't have to worry about using Link etc.
         * There is a loss in readability/discoverability compared to rendering the component directly but I've never
         * had a problem with people not understanding once the pattern is established.
         *
         * You can also use MemoryRouter and pass a spy history object if you need to manipulate the router history.
         */
        renderResult = render(
            <StaticRouter location={path}>
                <Routes {...allProps}/>
            </StaticRouter>,
        )
    })

    return renderResult!.container
}