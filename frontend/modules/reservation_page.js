import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = `${config.backendEndpoint}/reservations/`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  let string = "";
  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    reservations.map((res, index) => {
    
      let d = new Date(res.date);
      let date = d.toLocaleDateString("en-IN");
      let t = new Date(res.time);
      let dateTime = t.getDate();
      let month = months[t.getMonth()];
      let year = t.getFullYear();
      let timeClock = t.toLocaleTimeString("en-IN");

      let time = `${dateTime} ${month} ${year}, ${timeClock}`;

      let tRow = document.createElement(`tr`);
      tRow.innerHTML = `<th scope="col">${res.id}</th>
      <td scope="col">${res.name}</td>
      <td scope="col">${res.adventureName}</td>
      <td scope="col">${res.person}</td>
      <td scope="col">${date}</td>
      <td scope="col">${res.price}</td>
      <td scope="col">${time}</td>
      <td scope="col" id="${res.id}"><a><button id = "reservation-id" class = "reservation-visit-button">Visit Adventure</button></a></td>`;

      document.getElementById(`reservation-table`).appendChild(tRow);
      string = `../detail/?adventure=${res.adventure}`;
      document.getElementById(res.id).children[0].href = string;
    });
  }
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
