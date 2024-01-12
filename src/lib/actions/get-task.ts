import {createAction, Property} from "@activepieces/pieces-framework";
import {HttpMethod} from "@activepieces/pieces-common";
import { request } from '../sync-common/request';
import { platformAccessUidProps } from '../sync-common/props';

export const getTask = createAction({
    name: 'task_get',
    displayName: 'Récupérer une tâche',
    description: 'Récupère les informations d\'une tâche',
    props: {
        platformAccess: platformAccessUidProps,
        taskId: Property.ShortText({
            displayName: 'UID de la tâche',
            required: true,
        }),
    },
    async run({auth, propsValue }) {
        return request(auth, {
            method: HttpMethod.GET,
            endpoint: 'tasks/'.concat(propsValue.taskId),
            body: {
                platformAccess: propsValue.platformAccess,
                consumer: 'extension',
            }
        });
    }
});
