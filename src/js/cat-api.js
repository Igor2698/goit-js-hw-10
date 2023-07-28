const api_key = "live_sPwmyGHyrSZLuNUSNFtWTTQQMcW9qTi8Uy6YzTc3yFDCCxraXIV38rVhLJW9Pzpb"

export function fetchBreeds() {


    return fetch(`https://api.thecatapi.com/v1/breeds`, {
        headers: {
            'x-api-key': api_key
        }
    }).then(
        (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
    );
}

export function fetchPosts(catId) {


    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`,
        {
            headers: {
                'x-api-key': api_key
            }
        }).then(
            (response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        );
}