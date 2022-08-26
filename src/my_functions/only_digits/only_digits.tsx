export function onlyDigits(text: string) {
    return /^[0-9]+$/.test(text)
}