import { assert, object, string, array, optional, number, partial, Infer } from 'superstruct'

export const StorePostValidationModel = object({
    name: string(),
});

export type Store = Infer<typeof StorePostValidationModel> & {
    id?: string;
};
