import {PieceAuth, Property} from "@activepieces/pieces-framework";
import {syncCommon} from "./index";
import {AuthenticationType, httpClient, HttpMethod, HttpRequest} from "@activepieces/pieces-common";

export async function getToken(clientId: string, clientSecret: string): Promise<string> {

    const request: HttpRequest = {
        method: HttpMethod.POST,
        url: syncCommon.baseUrl.concat('token'),
        headers: {
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        authentication: {
            type: AuthenticationType.BASIC,
            username: clientId,
            password: clientSecret
        }
    };

    const { body } = await httpClient.sendRequest<{
        access_token: string,
        tokenType: string,
        expiresIn: number
    }>(request)

    return body.access_token
}

export const syncAuth = PieceAuth.CustomAuth({
    description: 'Enter your clientId and clientSecret',
    required: true,
    props: {
        clientId: Property.ShortText({
            displayName: 'Client ID',
            description: 'Enter the client id',
            required: true,
        }),
        clientSecret: Property.ShortText({
            displayName: 'Client Secret',
            description: 'Enter the client secret',
            required: true,
        })
    },
    validate: async ({auth}) => {
        try {
            if (auth && await getToken(auth.clientId, auth.clientSecret)) {
                return {
                    valid: true,
                }
            }
        } catch (e: any) {
            if ('response' in e) {
                console.debug(`Sync status: ${e.response.status}, data: ${JSON.stringify(e.response.body)}`);
            }

            return {
                valid: false,
                error: 'Connection failed. Please check your ClientId and ClientSecret',
            };
        }

        return {
            valid: false,
            error: 'Invalid ClientId and ClientSecret'
        }
    }
})
