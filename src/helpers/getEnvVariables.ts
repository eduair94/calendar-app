export const getEnvVariables = () => {
    return JSON.parse(JSON.stringify(import.meta.env));
}