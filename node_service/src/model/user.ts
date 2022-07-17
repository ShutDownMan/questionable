import { assert, object, string, array, optional, number, partial, Infer } from 'superstruct'

export const UserPostValidationModel = object({
    id: string(),
    name: string(),
    email: string(),
    password: string(),
});

export type User = Infer<typeof UserPostValidationModel> & {
    salt?: string;
    password_hash?: string;
};
