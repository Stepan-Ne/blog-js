export const isValid = (value) => {
    
    return (value.length > 10 && value.length <= 512)
}