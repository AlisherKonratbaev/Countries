import { Data } from "./data.js";
import { Countries } from "./components.js";

const tempApi = new Data();
const data = tempApi.loadData();

const countrySection = new Countries(data);
countrySection.addCards();





