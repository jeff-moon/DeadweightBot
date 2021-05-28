import {BaseRequest} from './base-request';
import { IncomingHttpHeaders } from 'http';
import { RequestOptions } from 'https';

/**
 * GET request
 */
export class GetRequest<TResult> extends BaseRequest {
    private options: RequestOptions;

    /**
     * 
     * @param baseUrl The base URL of the request
     * @param apiUrl The api-speific URL (e.g. /api/v8, /api)
     * @param endpoint The remote endpoint
     */
    constructor(baseUrl: string, apiUrl: string, endpoint: string, token?: string) {
        super();

        // Create headers
        let headers: IncomingHttpHeaders = {};
        if (token) {
            headers['authorization'] = `Bot ${token}`;
        }

        // Create HTTPS options
        this.options = {
            hostname: baseUrl,
            path: `${apiUrl}${endpoint}`,
            headers: headers,
            port: 443,
            method: 'GET'
        };
    }

    /**
     * Sends the GET request
     * @returns A promise that resolves to the specified generic type
     */
    public async send(): Promise<TResult> {
        const result: string = await this.perform(this.options);
        return JSON.parse(result) as TResult;
    }
}