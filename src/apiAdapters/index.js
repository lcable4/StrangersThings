const BASE_URL = "https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts"

export const getAllPosts = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
        })
        const result = await response.json();
        const fixedResult = result.data.posts
        return fixedResult
    } catch (error) {
        console.log(error)
    }
    getAllPosts()
}

export async function userLogin(name, pssword) {
    try {
        const username = name;
        const password = pssword; 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/users/login', {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
           }) 
        })
        const data = await response.json();
        localStorage.setItem('token', data.data.token); 
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}