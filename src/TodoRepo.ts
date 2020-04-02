export interface TodoRepo {
    getItems(): Promise<TodoItem[]>

    addItem(text: string): Promise<TodoItem>

    deleteItem(id: number): Promise<void>
}

export interface TodoItem {
    id: number
    text: string
}