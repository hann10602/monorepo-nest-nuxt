export const REGEX = {
    AT_LEAST_CHARACTERS: (length: number): RegExp => new RegExp(`/.{${length},}/`),
    AT_LEAST_1_NUMBER: /\d/,
    AT_LEAST_1_LOWERCASE_LETTER: /[a-z]/,
    AT_LEAST_1_UPPERCASE_LETTER: /[A-Z]/,
    PHONE_NUMBER: /^\d{10}$/,
}