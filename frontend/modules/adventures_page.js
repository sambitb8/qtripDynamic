import { json } from "stream/consumers";
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let queryParam = new URLSearchParams(search);
  let city = queryParam.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/adventures?city=" + city);
    let adventures = await res.json();
    return adventures;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let data = document.getElementById("data");
  adventures.forEach((obj) => {
    var div = document.createElement("div");
    div.className = "col-12 col-sm-6 col-md-6 col-lg-3 mb-5";
    div.innerHTML = `
            <a href="./detail/?adventure=${obj.id}" id="${obj.id}">
              <div class="activity-card">
                <div class="category-banner">${obj.category}</div>
                <img
                  src= "${obj.image}"
                  class="activity-card img"
                />
                </div>
               <div class="adventure-detail-card">
               <div class='d-flex justify-content-between'>
                <h6>${obj.name}</h6>
                <p>₹${obj.costPerHead}</p>
               </div>
               <div class='d-flex justify-content-between'>
                <h6>Duration</h6>
                <p>${obj.duration} Hours</p>
               </div>
               </div>
            </a>`;

    data.appendChild(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(
    (city) => city.duration >= low && city.duration <= high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((city) =>
    categoryList.includes(city.category)
  );
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
  if (filters["category"].length > 0 && filters.duration.length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
    let duration = filters["duration"].split("-");

    filteredList = filterByDuration(
      filteredList,
      parseInt(duration[0]),
      parseInt(duration[1])
    );
  } else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  } else if (filters.duration.length > 0) {
    let duration = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(duration[0]),
      parseInt(duration[1])
    );
  } else {
    filteredList = list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  let val = JSON.parse(localStorage.getItem("filters"));
  return val;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters["category"];
  let catList = document.getElementById("category-list");

  categoryList.forEach((city) => {
    let div = document.createElement("div");
    div.className = "category-filter";
    div.textContent = `${city}`;
    catList.appendChild(div);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
