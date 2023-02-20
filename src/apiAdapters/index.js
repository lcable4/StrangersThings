const BASE_URL = "https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts"

export const getAllPosts = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
        })
        const result = await response.json();
        const fixedResult = result.data.posts
        // console.log(result, "result")
        // console.log(fixedResult, "fixed result")
        return fixedResult
    } catch (error) {
        console.log(error)
    }
    getAllPosts()
}

export const registrationInfo = async (name, password) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer TOKEN_STRING_HERE",
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),

        })
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)  
    }
    registrationInfo()
}
