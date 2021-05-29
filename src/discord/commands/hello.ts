/**
 * Hello response
 */
export interface IHelloResponse {
    op: number;
    t: null;
    s: null;
    d: {
        heartbeat_interval: number;
        _trace: string[];
    }
}