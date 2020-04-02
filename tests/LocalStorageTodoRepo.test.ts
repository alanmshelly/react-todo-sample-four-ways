import {LocalStorageTodoRepo} from '../src/LocalStorageTodoRepo'

let repo: LocalStorageTodoRepo
beforeEach(() => {
    localStorage.clear()
    repo = new LocalStorageTodoRepo()
})

describe('getItems', () => {
    it('should return an empty list', async () => {
        const items = await repo.getItems()

        expect(items).toEqual([])
    })
})

describe('addItem', () => {
    it('should add multiple items with ids', async () => {
        await repo.addItem('hello')
        await repo.addItem('world')


        const items = await repo.getItems()
        expect(items).toEqual([
            {
                id: 1,
                text: 'hello',
                isDone: false,
            },
            {
                id: 2,
                text: 'world',
                isDone: false,
            },
        ])
    })
})

describe('deleteItem', () => {
    it('should delete the specified item', async () => {
        await repo.addItem('hello')
        await repo.addItem('world')
        await repo.addItem('hoge')


        await repo.deleteItem(2)


        const items = await repo.getItems()
        expect(items).toEqual([
            {
                id: 1,
                text: 'hello',
                isDone: false,
            },
            {
                id: 3,
                text: 'hoge',
                isDone: false,
            },
        ])
    })
})