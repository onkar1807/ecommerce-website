const baseurl = "https://ecoomerce-website-clone.herokuapp.com"

export const API = `${baseurl}/api`

export const generatePublicUrl = (filename) => {
    return `${baseurl}/public/${filename}`;
}