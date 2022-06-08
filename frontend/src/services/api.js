const HOST = 'http://localhost:3000'

export async function getArticleList (page, search, filter, sort) {
    let params = {
        search, filter, sort, page
    }
    let response = await fetch(`${HOST}/article`, {
        method : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(params)
    })
    let result = await response.json()
    return result;
}

export async function getCategoryList () {
    let response = await fetch(`${HOST}/article/categories`, {
        method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })
    let result = await response.json()
    return result;
}

export async function getAuthorList () {
    let response = await fetch(`${HOST}/article/authors`, {
        method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })
    let result = await response.json()
    return result;
}


export async function saveUserInfo (data) {
    let response = await fetch(`${HOST}/user/profile`, {
        method : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(data)
    })
    return response;
}
