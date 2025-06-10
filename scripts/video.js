// Featch, Load and Show Catagories on HTML 

// create  loadCatagories
const loadCatagories = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}
// create  loadVidoes
const loadVidoes = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => videoDisplay(data.videos))
        .catch((error) => console.log(error))
}
// create loadCategoryVidoes
const loadCategoryvidoes = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            //Remove all the active class
            removeActiveClass();
            //Active class with id
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active")
            videoDisplay(data.category)
        })
        .catch((error) => console.log(error))
}
// create loadDetails 
const loadDetails = async (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch (url);
    const data = await res.json();
    // console.log(data);
    displayDetails(data.video);
}

// create a displayDetails 
const displayDetails = (video) => {
    // console.log(video);
    const detailsContainer = document.getElementById("modal-content");

    detailsContainer.innerHTML = `
    <div>
    <img src="${video.thumbnail}" alt="video.thumbnail" />
    </div>
    <p>${video.description}</p>
    `;

    // Way 1
    // document.getElementById("showModalData").click();

    // Way 2
    document.getElementById("customModal").showModal();
}
// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    //add Data in HTML
    categories.forEach(item => {
        //create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
            `
        <button id="btn-${item.category_id}" onclick = "loadCategoryvidoes(${item.category_id})"class="btn category-btn">
            ${item.category}
        </button>
        `
        // add button to category container 
        categoryContainer.append(buttonContainer);

    });
}


const demoObject = {
    "category_id": "1003",
    "video_id": "aaae",
    "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
    "title": "Inside Amy Schumer",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
            "profile_name": "Amy Schumer",
            "verified": ""
        }
    ],
    "others": {
        "views": "3.6K",
        "posted_date": "15147"
    },
    "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
}

function timeStringConverter(time) {
    // const years =  parseInt(time/)
    const months = parseInt(time / (86400 * 30))
    let remainingSeconds = time % (86400 * 30);
    const days = parseInt(remainingSeconds / 86400);
    remainingSeconds = remainingSeconds % 86400;
    const hours = parseInt(remainingSeconds / 3600);
    remainingSeconds = remainingSeconds % 3600;
    const munites = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${days} d ${hours} h ${munites} m ${remainingSeconds} s ago`;
};

//Active class remove function
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}

// create videoDisplay
const videoDisplay = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if (videos.length === 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class = "min-h-[400px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" />
        <h2 class="text-center text-xl font-bold">
        No Content here in this Category
        </h2>
        </div>
        `;
        return 0;
    }
    else {
        videoContainer.classList.add("grid");
    }

    videos.forEach(video => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card";
        card.innerHTML = `
        <figure class = "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class = "h-full  w-full object-cover"
      alt="video.title" />
      ${video.others.posted_date?.length === 0 ? "" : `<span class = "absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${timeStringConverter(video.others.posted_date)}</span>`
            }
  </figure>
  <div class="px-0 py-2 flex items-center">
  <div>
  <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
  </div>
  <div>
  <h2>${video.title}</h2>
  <div class ="flex items-center gap-2">
  <p class = "text-gray-400">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ? `<img class ="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
  <p><button onclick = "loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
  </div>
  </div>
  </div>
        `
        videoContainer.append(card);
    })

}



loadCatagories();
loadVidoes();