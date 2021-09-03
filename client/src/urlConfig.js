const baseurl = "https://ecommerce-rest-sever.herokuapp.com"

export const API = `${baseurl}/api`

export const generatePublicUrl = (filename) => {
    return `${baseurl}/public/${filename}`;
}