const loadPosts = () => {
    const url = "https://dummyjson.com/users";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayPosts(data.users);
        })
};


const displayPosts = (usersData) => {
    // 1. get the container
    const postContainer = document.getElementById('post-container');
    // console.log(postContainer);

    usersData.forEach((user) => {
        console.log(user.address.address);

        // 2. create HTML element
        const li = document.createElement('li');
        li.innerText = user.address.address;

        // 3. add li into container
        postContainer.appendChild(li);
    });
}