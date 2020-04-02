export type DelayedPromise<T> = {
    resolve: (value: T) => void
} & Promise<T>

export function createDelayedPromise<T>(): DelayedPromise<T> {
    let resolveFunction: (value: T) => void
    const promise = new Promise((resolve => {
        resolveFunction = resolve
    })) as DelayedPromise<T>

    promise.resolve = (value: T) => {
        resolveFunction(value)
    }

    return promise
}