export interface authForms {
    email: string;
    password: string;
    displayName?: string;
}

export interface FormValidationElement {
    validation: (value: string) => boolean;
    message: string;
}

export interface FormValidations {
    email: [(value: string) => boolean, string];
    password: [(value: string) => boolean, string];
    displayName?: [(value: string) => boolean, string];
}

export interface NoteValidations {
    body?: [(value: string) => boolean, string];
    title?: [(value: string) => boolean, string];
}

export interface UseFormHookValidations {
    formValidations: FormValidations | NoteValidations;
}

export interface FormChekedValues {
    [key: string]: string | null;
}

export interface Note {
    id?: string
    title: string,
    body: string,
    date: number,
    imageUrls?: Array<string> | null
}

export interface JornalState {
    isSaving: boolean,
    messageSaved?: string,
    notes: Array<Note>,
    active?: Note | null
}

export interface AuthState {
    ok?: boolean | null
    status?: 'checking' | 'not-authenticated' | 'authenticated',
    uid?: string | null
    email?: string | null
    displayName?: string | null
    photoURL?: string | null
    errorMessage?: string | null

}