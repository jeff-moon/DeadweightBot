import {IncomingMessage, OutgoingHttpHeaders} from 'http';
import https, {RequestOptions} from 'https';

/**
 * Request options
 */
export interface HttpsRequestOptions<TBody> {
    hostname: string;  // The domain name
    endpoint: string;  // The endpoint to hit
    body?: TBody;      // Optional body
};

/**
 * HTTPS Client used for all HTTPS requests
 */
export class HttpsClient {

    /**
     * Performs GET request
     * @param token The discord bot token
     * @param options The request options
     * @returns The generically request response parsed as JSON
     */
    public async get<TResponse>(token: string, options: HttpsRequestOptions<void>): Promise<TResponse> {
        const headers: OutgoingHttpHeaders = {
            authorization: `Bot ${token}`
        };
           
        const httpsOptions: RequestOptions = {
            hostname: options.hostname,
            path: options.endpoint,
            port: 443,
            headers: headers
        };

        return await this.request<void, TResponse>(httpsOptions, options.body);
    }

    /**
     * Performs POST request
     * @param token The discord bot token
     * @param options The request options
     * @returns The generically typed request response parsed as JSON
     */
    public async post<TBody, TResponse>(token: string, options: HttpsRequestOptions<TBody>): Promise<TResponse> {
        const headers: OutgoingHttpHeaders = {
            authorization: `Bot ${token}`
        };
           
        const httpsOptions: RequestOptions = {
            hostname: options.hostname,
            path: options.endpoint,
            port: 443,
        };

        return await this.request<TBody, TResponse>(httpsOptions, options.body);
    }

    /**
     * Performs a generic request
     * @param options The request options
     * @param body The optional request body
     * @returns Generically typed request response parsed as JSON 
     */
    private request<TBody, TResponse>(options: RequestOptions, body?: TBody): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            // Create the request
            const req = https.request(options, (res: IncomingMessage) => {
                let data: string = '';

                // On data, build up the response string
                res.on('data', (chunk: string) => {
                    data += chunk;
                });

                // On end, resolve the promise
                res.on('end', () => {
                    resolve(JSON.parse(data) as TResponse);
                });

                // On error, return the error
                res.on('error', (err) => {
                    reject(err);
                });
            });

            // Add optional body
            if (body) {
                req.write(JSON.stringify(body));
            }

            // Perform request
            req.end();
        });
    }
}