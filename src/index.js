// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.getElementById("ramen-menu")
    const ramenDetail = document.getElementById("ramen-detail")
    const newRamen = document.getElementById("new-ramen")

    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                ramenObj(element)

                if (element.id === 1) {
                    displayInfo(element)
                }
            });
        })

    function ramenObj(item) {
        let img = document.createElement("img")
        img.setAttribute("src", `${item.image}`)
        ramenMenu.append(img)

        img.addEventListener("click", () => {
            displayInfo(item)
        })
    }

    function displayInfo(item) {
        ramenDetail.querySelector("img").setAttribute("src", `${item.image}`);
        ramenDetail.querySelector("h2").innerText = item.name;
        ramenDetail.querySelector("h3").innerText = item.restaurant;
        document.getElementById("rating-display").innerText = item.rating;
        document.getElementById("comment-display").innerText = item.comment;
    }

    newRamen.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = {
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value
        }
        fetch("http://localhost:3000/ramens", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => ramenObj(data))

        newRamen.reset()
    })
})