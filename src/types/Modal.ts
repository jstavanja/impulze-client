export enum Modal {
  AddImpulze = 'addImpulze',
  EditImpulze = 'editImpulze',
}

export interface ModalWithPayload {
  name: Modal
  payload: unknown
}
