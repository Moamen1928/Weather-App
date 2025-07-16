const container = document.getElementById("container");
const button = document.getElementById("submit");
const input = document.getElementById("input");
const background = document.getElementById("details");

window.onload = () => { 
    document.getElementById("input").focus();
    const contented = document.getElementById("content")

    setTimeout(() => {
    contented.classList.remove("translate-y-[-50px]", "opacity-0");
    contented.classList.add("translate-y-0", "opacity-100");
    })
}

function getweather(city) {
    const apiKey = "e412a47cec84278b4325070f66cb6b2f";

fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
)
    .then((response) => response.json())
    .then((data) => {
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("digree").innerHTML = `${Math.round(data.main.temp)} °C`;
    document.getElementById("condition").innerHTML = data.weather[0].main;
        
    const condition = data.weather[0].main;
    const iconcode = data.weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${iconcode}.png`;
    const image =document.getElementById("iconic");

    image.src =`${iconurl}`
    image.alt = `${condition}`
    image.className = "w-[100px] h-[100px]"

    backgroundimage(condition);
    })
    .catch((error) => {
        alert("City not found");
    });
return city;
}
function getforecast(city) {
    const apiKey = "e412a47cec84278b4325070f66cb6b2f";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const daily = data.list.filter((items) =>
        items.dt_txt.includes("12:00:00")
        );
        const dayscontainer = document.getElementById("days");
        dayscontainer.innerHTML = "";
        daily.slice(0, 5).forEach((day) => {
        const date = new Date(day.dt_txt);
        const dayname = date.toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(day.main.temp);
        const condition = day.weather[0].main;
        const iconcode = day.weather[0].icon;
        const iconurl = `http://openweathermap.org/img/wn/${iconcode}.png`;

        const getbackgroundimage = changbg(condition);

        const li = document.createElement("li");
        li.className =
            "p-[10px] mb-4 bg-blue-500 backdrop-blur-md rounded-2xl shadow-lg text-blue-950 transform transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl opacity-0"
        li.style.backgroundImage = `url(${getbackgroundimage})`;
        li.style.backgroundSize = "cover";
        li.style.backgroundPosition = "center";

        li.innerHTML = `
        <div class="flex justify-between items-center">
            <div class="flex items-center">
            <img src="${iconurl}" class="w-10 h-10 mr-2" alt="${condition}" />
            <h2 class="text-2xl font-bold">${temp} °C</h2>
            </div>
            <div class="text-right">
            <p class="font-bold text-xl">${dayname}</p>
            <p class="text-lg">${condition}</p>
            </div>
        </div>
        `;
        dayscontainer.appendChild(li);
        });
    })
    .catch((err) => {
        console.error("Error fetching forecast:", err);
    });
}

function changbg(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "./images/clear.jpg";
        case "clouds":
            return "./images/Clouds.jpg";
        case "rain":
            return "./images/Rain.jpg";
        case "snow":
            return "./images/Snow.jpg";
        case "thunderstorm":
            return "./images/Thunderstorm.jpg";
        default:
            return "./images/Clouds.jpg";
    }
}

function backgroundimage(condition) {
    const backgroundchange = document.getElementById("container");
    let imageurl = "";
    switch (condition.toLowerCase()){
        case "clear":
            imageurl= "./images/clear.jpg"
        break;
        case "clouds":
            imageurl= "./images/Clouds.jpg"
        break;
        case "rain":
            imageurl= "./images/Rain.jpg"
        break;
        case "snow":
            imageurl= "./images/Snow.jpg"
        break;
        case "thunderstorm":
            imageurl= "./images/Thunderstorm.jpg"
        break
        case "sunny":
            imageurl = "./images/sunny.jpg"
        break;
        default:
            imageurl= "./images/defaults.jpg"
    }
    backgroundchange.style.backgroundImage = `url(${imageurl})`;
    backgroundchange.style.backgroundSize = "cover";
    backgroundchange.style.backgroundPosition = "center";
}

    const box1 = document.getElementById("content");
    const box2 = document.getElementById("details");
    const box3 = document.getElementById("content-right");
    const days = document.getElementById("days");
    const weathercontent = document.getElementById("content-lift")
    const buttonclick = document.getElementById("submit");


button.addEventListener("click", () => {
        const city = input.value.trim();
    if(city === "") return;

    getweather(city);
    getforecast(city);

    box1.classList.add("lg:w-1/3");
    box1.classList.remove("lg:w-1/2");

    box2.classList.remove("lg:w-0");
        box2.classList.add("lg:w-1/3");

        box2.classList.remove("opacity-0");
        box2.classList.add("opacity-100");

    setTimeout(() =>{

        weathercontent.classList.remove("opacity-0");
        weathercontent.classList.add("opacity-100");

        box3.classList.remove("lg:w-0");
        box3.classList.add("lg:w-1/3");
        box3.classList.remove("opacity-0");
        box3.classList.add("opacity-100");

        const items = days.querySelectorAll("li")
        items.forEach((item,index) => {
            setTimeout(() => {
                item.classList.remove("opacity-0");
            item.classList.add("opacity-100");
      }, index * 400);
    });
    }, 700);
});
