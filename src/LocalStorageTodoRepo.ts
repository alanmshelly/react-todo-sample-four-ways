import {TodoItem, TodoRepo} from './TodoRepo'

/**
 * NOTE:
 * wait is meant to simulate delays caused by IO, in order to check that operations that are called before
 * another one finishes don't cause unexpected changes to the todo list.
 */
function wait() {
    return new Promise<void>(resolve => {
        const msToWait = 500
        setTimeout(resolve, msToWait)
    })
}

export class LocalStorageTodoRepo implements TodoRepo {
    async getItems(): Promise<TodoItem[]> {
        return JSON.parse(localStorage.getItem('list') || '[]')
    }

    async addItem(text: string): Promise<TodoItem> {
        await wait()
        const currentMaxId: number = JSON.parse(localStorage.getItem('currentMaxId') || '0')
        const newMaxId = currentMaxId + 1
        localStorage.setItem('currentMaxId', String(newMaxId))
        const newItem = {
            id: newMaxId,
            isDone: false,
            text,
        }
        const list = JSON.parse(localStorage.getItem('list') || '[]')
        localStorage.setItem('list', JSON.stringify([...list, newItem]))
        return newItem
    }

    async deleteItem(id: number): Promise<void> {
        await wait()
        const list: TodoItem[] = JSON.parse(localStorage.getItem('list') || '[]')
        const listWithItemDeleted = JSON.stringify(list.filter(item => item.id !== id))
        localStorage.setItem('list', listWithItemDeleted)
    }
}