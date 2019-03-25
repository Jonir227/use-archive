type State = 'INIT' | 'WAITING' | 'SUCCESS' | 'FAILURE';

type ApiEndPoint<T> = (...p: any[]) => Promise<T>;
