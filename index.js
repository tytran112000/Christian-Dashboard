function getImage() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&query=mountain&query=river&query=sea&query=waterfall")
      .then(res => res.json())
      .then(data => {
                
        // Get the path of the img url
        const unsplashImg = data.urls.raw;

        localStorage.setItem("unsplashImg", JSON.stringify(unsplashImg));
        // Display the img
        document.body.style.backgroundImage = `url(${unsplashImg})`;
      });
}
function getText() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '46d9a87b62msh7d5ccbba92783a7p1fe488jsn108bd7cff636',
        'X-RapidAPI-Host': 'uncovered-treasure-v1.p.rapidapi.com'
      }
    };
  
    fetch('https://uncovered-treasure-v1.p.rapidapi.com/random', options)
      .then(response => response.json())
      .then(data => {
        // Get the path of the quote and context of quote
        const text = data.results[0].text;
        const context = data.results[0].scriptures[0]; 

        localStorage.setItem("textOfTheDay", JSON.stringify(text));
        localStorage.setItem("contextOfTheDay", JSON.stringify(context));
        // Display the quote and context
        document.getElementById("header").innerHTML = `
          <h3 id="random-text-context">${context}</h3>
          <h1 id="random-text">"${text}"</h1>
        `;
      })
      .catch(err => console.error(err));
  }

  function getTodayTime() {
    const now = new Date();
    const todayDate = now.getDate();
    const todayHour = now.getHours();
    return `${todayDate} ${todayHour}:00`;
  }

  function getYesterdayTime() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.getDate();
    const yesterdayHour = yesterday.getHours();
    return `${yesterdayDate} ${yesterdayHour}:00`;
  }



  function checkAndUpdate() {
    const pacificOffset = -7;
    const now = new Date();
    const currentHour = now.getUTCHours() + pacificOffset;
  
    const todayTime = getTodayTime();
    const yesterdayTime = getYesterdayTime();
  
    // Check if it's 8am pacific time
    if (currentHour === 8) {
      localStorage.setItem('todayTime', todayTime);
  
      // Fetch the data and update the page
      getImage();
      getText();
    } else {
      const storedTodayTime = localStorage.getItem('todayTime');
      if (storedTodayTime === null) {
        // If there is no stored today time, fetch the data and update the page
        getImage();
        getText();
    } else if (storedTodayTime === todayTime) {
      // If the stored today time is the same as the current day time, display yesterday's data
      const storedYesterdayTime = localStorage.getItem('yesterdayTime');
      const storedUnsplashImg = localStorage.getItem('unsplashImg');
      const storedTextOfTheDay = localStorage.getItem('textOfTheDay');
      const storedContextOfTheDay = localStorage.getItem('contextOfTheDay');
      document.body.style.backgroundImage = `url(${storedUnsplashImg})`;
      document.getElementById("header").innerHTML = `
        <h3 id="random-text-context">${storedContextOfTheDay}</h3>
        <h1 id="random-text">"${storedTextOfTheDay}"</h1>
      `;
    } else if (storedTodayTime === yesterdayTime) {
      // If the stored today time is yesterday's time, display yesterday's data
      const storedYesterdayTime = localStorage.getItem('yesterdayTime');
      const storedUnsplashImg = localStorage.getItem('unsplashImg');
      const storedTextOfTheDay = localStorage.getItem('textOfTheDay');
      const storedContextOfTheDay = localStorage.getItem('contextOfTheDay');
    
      document.body.style.backgroundImage = `url(${storedUnsplashImg})`;
      document.getElementById("header").innerHTML = `
        <h3 id="random-text-context">${storedContextOfTheDay}</h3>
        <h1 id="random-text">"${storedTextOfTheDay}"</h1>
      `;
    } else {
      // If the stored today time is different from both the current and yesterday's time, fetch the data and update the page
      localStorage.setItem('yesterdayTime', storedTodayTime);
      localStorage.setItem('todayTime', todayTime);
    
      getImage();
      getText();
    }
  }
}

checkAndUpdate()
