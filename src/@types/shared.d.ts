type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type State = 'INIT' | 'WAITING' | 'SUCCESS' | 'FAILURE';

type ApiEndPoint<T, A extends any[]> = (...p: A) => Promise<T>;
