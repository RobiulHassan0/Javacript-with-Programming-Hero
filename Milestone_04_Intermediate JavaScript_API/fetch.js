
const loadPosts = () => {
    fetch("https://dummyjson.com/carts")
        // promise of 
        .then( (response) => response.json())

        // poromise of json data
        .then( (data) => console.log(data)); 

}

const loadPosts = () => {
    const url = "https://dummyjson.com/carts";

    fetch(url)
        .then( (res) => res.json())
        .then((json) => {
            console.log(json.carts);
            displayPosts(json.carts);
        });
}

const displayPosts = (posts) => {
    posts.forEach( (post) => {
        console.log(post.discountedTotal);
    });
};