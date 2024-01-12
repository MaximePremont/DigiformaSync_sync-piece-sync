import {request} from "./request";
import {HttpMethod} from "@activepieces/pieces-common";

export const getWebhookTypes = async (auth: any): Promise<{ value: string, label: string }[]> => {
    return await request(auth, {
        endpoint: 'enum/webhook-types',
        method: HttpMethod.GET,
    }) as Promise<{ value: string, label: string }[]>;
}

export const createWebhook = async (auth: any, webhookUrl: string, webhookTypes: string[]) => {
    return request(auth, {
        endpoint: 'webhook-urls',
        method: HttpMethod.POST,
        body: {
            url: webhookUrl,
            typeSubscribed: webhookTypes,
        }
    });
}

export const deleteWebhook = async (auth: any, webhookUid: string) => {
    return request(auth, {
        endpoint: 'webhook-urls/'.concat(webhookUid),
        method: HttpMethod.DELETE,
    });
}