// == what my event objects should look like when returned
/**
 * @typedef Event
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

//===== constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2109-CPU-RM-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

//=== my state ====
let events = [];
let selectedEvent;

// fetch from my api
async function getEvents() {
  try {
    const res = await fetch(`${API}`);
    const json = await res.json();
    events = json.data;
    console.log(events);
    render();
  } catch (err) {
    console.error(err);
  }
}
//=== updating state with a single event from the API
async function getEvent(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    selectedEvent = json.data;
    render();
  } catch (err) {
    console.error(err);
  }
}
//event name that will show more details when clicked
function EventListItem(event) {
  const $eventListItem = document.createElement("li");
  $eventListItem.innerHTML = `<a href="#selected">${event.name}</a>`;
  $eventListItem.addEventListener("click", async function () {
    await getEvent(event.id);
    console.log(selectedEvent);
  });
  return $eventListItem;
}

// a list of all events
function EventList() {
  const $eventList = document.createElement("ul");
  $eventList.classList.add("UpcomingParties");
  const $events = events.map(EventListItem);
  $eventList.replaceChildren(...$events);
  return $eventList;
}
// Inforamtion about the event
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  // === what to do for the event details and how to display it
  const $eventDetails = document.createElement("section");
  $eventDetails.classList.add("event");
  $eventDetails.innerHTML = `
<h3>${selectedEvent.name} #${selectedEvent.id}</h3>
<p>${selectedEvent.description}</p>
<p>${selectedEvent.date}</p>
<p>${selectedEvent.location}</p>
`;
  return $eventDetails;
}
//==Render function==
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
<h1> Party Planner</h1>
<main>
<section>
<h2> Upcoming parties</h2>
<EventList></EventList>
</section>
<section id="selected">
<h2>Party Details</h2>
<EventDetails></EventDetails>
</section>
</main>

`;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
