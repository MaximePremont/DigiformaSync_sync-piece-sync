import {syncCommon} from "./index";
import {httpClient, HttpMethod} from "@activepieces/pieces-common";
import {getToken} from "./auth";

export const request = async (
    auth: {
        clientId: string,
        clientSecret: string,
    } | any,
    requestData: {
        endpoint: string,
        method: HttpMethod,
        body?: any,
        headers?: any,
        queryParams?: any,
    }
) => {
    const accessToken = await getToken(auth.clientId, auth.clientSecret)

    const request = {
        method: requestData.method,
        url: syncCommon.baseUrl.concat(requestData.endpoint),
        headers: {
            "Authorization": 'Bearer ' + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            ...requestData.headers
        },
        body: requestData.body,
        queryParams: requestData.queryParams
    }

    if (requestData.method === HttpMethod.GET) {
        delete request.body;
    }

    const response = await httpClient.sendRequest(request);

    return response.body;
}

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
