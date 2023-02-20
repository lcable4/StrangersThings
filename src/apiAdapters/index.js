const BASE_URL = "https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts"

export const getAllPosts = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
        })
        const result = await response.json();
        const fixedResult = result.data.posts
        console.log(fixedResult)
        return fixedResult
    } catch (error) {
        console.log(error)
    }
    getAllPosts()
}
