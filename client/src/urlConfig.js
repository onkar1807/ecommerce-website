let baseUrl = "http://localhost:5000"

export const API = `${baseUrl}/api`

export const generatePublicUrl = (filename) => {
    return `${baseUrl}/public/${filename}`;
}