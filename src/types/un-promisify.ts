export type Unpromisify<T> = T extends Promise<any> ? T : never
