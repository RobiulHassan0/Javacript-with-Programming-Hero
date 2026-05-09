const loadPosts = () => {
  const url = "https://dummyjson.com/users";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayPosts(data.users);
    });
};
loadPosts();

const displayPosts = (allUsers) => {
  // 1. get the container and empty the container
  const userContainer = document.getElementById("user-container");
  userContainer.innerHTML = "";

  allUsers.forEach((user) => {
    // 2. create Element
    const userCard = document.createElement("div");
    userCard.innerHTML = `
        <div class="user-card">
            <div style="display: flex; gap: 10px;">
                <h2>Name : ${user.firstName}</h2>
                <h2>${user.lastName}</h2>
            </div>
            <p>Age : ${user.age}</p>
            <p>Email : ${user.email}</p>
            <p>Role : ${user.role}</p>
            <img src="${user.image}" alt="user_image">

        </div>
        `;
    // 3.addd to container
    userContainer.append(userCard);
  });

};

