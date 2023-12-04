// console.log("weather application...");

// const API_KEY = "8d3e8cd1814c2e7715e927ea987f10b6";
// // https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}

// async function showweather() {
//     let latitude = 22.3072;
//     let longitude = 73.1812;

//     const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//     );

//     const data = await response.json();
//     console.log("weather data : ", data);

//     let newPara = document.createElement('p');
//     newPara.textContent = `Country Name : ${data?.city?.name} , Population : ${data?.city?.population}`;

//     document.body.appendChild(newPara);
// }


