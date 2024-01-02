import {Property} from "@activepieces/pieces-framework";
import {getWebhookTypes, request} from "./request";

export const platformAccessUidProps = Property.ShortText({
    displayName: 'Id du sous compte',
    description: 'PlatformAccessId',
    required: true,
})

export const webhookTaskTypesProps = Property.MultiSelectDropdown({
  displayName: 'Types de tâches',
  required: true,
  refreshers: ['auth'],

  async options({auth}) {
    if (!auth) {
      return {
        disabled: true,
        placeholder: 'Vous devez vous authentifier',
        options: [],
      };
    }

    const optionList = (await getWebhookTypes(auth))
      .filter((option) => !option.value.startsWith('edof_registration_folders_state_change'))

    return {
      disabled: false,
      options: optionList
    };
  }
})

export const webhookStatusTypesProps = Property.MultiSelectDropdown({
  displayName: 'Statut',
  required: true,
  refreshers: ['auth'],

  async options({auth}) {
    if (!auth) {
      return {
        disabled: true,
        placeholder: 'Vous devez vous authentifier',
        options: [],
      };
    }

    const optionList = (await getWebhookTypes(auth))
      .filter((option) => option.value.startsWith('edof_registration_folders_state_change'))

    return {
      disabled: false,
      options: optionList
    };
  }
})


export const folderNumberProps = Property.ShortText({
    displayName: 'Numéro de dossier',
    description: 'Numéro de dossier',
    required: true,
})
