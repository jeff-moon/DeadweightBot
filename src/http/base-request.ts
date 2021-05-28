import { IncomingMessage } from 'http';
import https, { RequestOptions } from 'https';

/**
 * A base http request
 */
export class BaseRequest {

    /**
     * Performs the request
     * @returns A promise to the request results
     */
    protected async perform(options: RequestOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            // Create the request
            const req = https.request(options, (res: IncomingMessage) => {
                let data: string = '';

                // On data, build up the response string
                res.on('data', (chunk: string) => {
                    data += chunk;
                });

                // On end, resolve the promise
                res.on('end', () => {
                    resolve(data);
                });

                // On error, return the error
                res.on('error', (err) => {
                    reject(err);
                });
            });

            // Perform request
            req.end();
        });
    }
}