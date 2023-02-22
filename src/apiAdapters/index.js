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

export async function makeNewPost (title, description, price, location) {
    try {
        const userID = localStorage.getItem('userID');
        const response = fetch('https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: "$"+price,
                location: location,
                willDeliver: true,
                authorId: userID
              }
            })
        })
        const data = await response.json();
        return data
        }  catch (error) {
        console.log(error)
    }
 }
// export async function deletePost () {
//     try {
//         const response = fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts/${}`, {
//             method: "DELETE",
//              headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//   }
//         })
//     } catch (error) {
        
//     }
// }