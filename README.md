# Glass Weather App

A modern, responsive Weather Application built with **Vanilla JavaScript (ES6+)**, **HTML5**, and **CSS3**. Featuring an ultra-sleek **Glassmorphism UI**, dynamic background themes, and interactive 3-day forecast sequencing, this app offers a clean and intuitive way to check real-time weather conditions globally.

---

## 🌟 Key Features

* **Glassmorphism Design:** Styled with customizable glass-like translucent panels, backdrop blurs (`backdrop-filter`), subtle borders, and balanced dynamic glow effects.
* **Real-Time Weather Data:** Powered by the [WeatherAPI.com](https://www.weatherapi.com/) REST API.
* **Dynamic Backgrounds:** Automatically updates body imagery based on condition codes (Sunny, Cloudy, Rainy, Snowy, Thunderstorm).
* **3-Day Forecast:** Displays daily weather outlooks using native JS date formatting (`toLocaleDateString`) for clean weekday displays.
* **Skeleton Loading States:** Smooth UX loading feedback powered by CSS pulse animations while data is being retrieved.
* **Staggered Animations:** Seamless entrance animations (`@keyframes`) applied to forecast panels.
* **Fully Responsive:** Adaptive layouts optimized for both desktop viewports and modern mobile devices using CSS Flexbox and Media Queries.

---

## 🚀 Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox, Keyframes, Media Queries)
* **JavaScript:** Vanilla JS (ES6+, Async/Await, Fetch API, DOM Manipulation)
* **Typography:** [Figtree Font Family](https://fonts.google.com/specimen/Figtree) via Google Fonts
* **API:** WeatherAPI.com

---

## 📂 Project Structure

```text
├── index.html
├── style.css
├── script.js
├── images/
│   ├── sunny.jpg
│   ├── cloudy.jpg
│   ├── rainy.jpg
│   ├── snowy.jpg
│   └── thunder.jpg
└── README.md
```

## Installation
1. Clone the repository:
```bash 
git clone https://github.com/avtzo/Weather-App-V2.git
```
2. Configure your API Key:
  Open script.js and replace the placeholder API key inside the getWeatherData function with your actual key.
3. Run the Application:
Open index.html directly in any web browser, or launch it using VS Code's Live Server extension.
