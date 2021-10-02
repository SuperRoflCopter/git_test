export const getRandomCat = async () => {
    return fetch('https://aws.random.cat/meow')
    .then(response => response.json())
    .then(data => data)
}
