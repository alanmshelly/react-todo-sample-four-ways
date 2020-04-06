/**
 * Note:
 * This pattern of holding the paths is done for a couple of reasons.
 *
 * 1. All the paths are held in one place so it's easily findable
 *   i. We can't put them in Routes.tsx as it could cause a dependency loop when using links
 * 2. Using constants means that we only have to change one place when the path changes (don't have to update links)
 *
 * The disadvantage of this pattern is a decline in readability from the Routes and Page components, especially when
 * path params start getting involved.
 */
export enum PagePaths {
    ClassContextTodoPage = '/class-context',
    ClassStateTodoPage = '/class-state',
    FunctionalContextTodoPage = '/functional-context',
    FunctionalStateTodoPage = '/functional-state',
}
