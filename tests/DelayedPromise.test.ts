import {createDelayedPromise} from './DelayedPromise'

describe('DelayedPromise', () => {
    it('should be a Promise', () => {
        expect(createDelayedPromise().constructor).toBe(Promise)
    })

    it('should not resolve', async () => {
        let promiseResolved = false
        createDelayedPromise()
            .then(() => {
                promiseResolved = true
            })

        await wait()

        expect(promiseResolved).toEqual(false)
    })

    it('should resolve with value when resolve is called', async () => {
        let promiseResolveValue: string | null = null
        let delayedPromise = createDelayedPromise<string>()
        delayedPromise
            .then((value) => {
                promiseResolveValue = value
            })
            .then(() => undefined)

        delayedPromise.resolve('promise resolved with value')

        await wait()

        expect(promiseResolveValue).toEqual('promise resolved with value')
    })
})

function wait() {
    return new Promise(resolve => setImmediate(resolve))
}