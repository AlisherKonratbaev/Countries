
class Countries {
    constructor(countries) {
        this.countries = countries;
        this._addSection();
    }

    _addSection() {
        let sectionEl = document.createElement("section");
        sectionEl.classList.add("countries");
        document.body.insertAdjacentElement("afterbegin", sectionEl);
        

        let inputBox = document.createElement("div");
        inputBox.classList.add("input_box");
        sectionEl.appendChild(inputBox);

        let inputEl = document.createElement("input");
        inputEl.classList.add("country_input");
        inputEl.type = "text";
        inputEl.name = "country-input";
        inputEl.placeholder = "name...";
        inputBox.appendChild(inputEl);

        this.box = document.createElement("div");
        this.box.classList.add("box");
        sectionEl.appendChild(this.box);

        this.paginationEl = document.createElement("div");
        this.paginationEl.classList.add("pagination");
        sectionEl.appendChild(this.paginationEl);

    }

    addCards = async function () {
        let tempArr = await this.countries;

        let resultArr = this._getCountryCards(tempArr);
        this.box.innerHTML = resultArr.join("");

        this._filterItems();
    }

    _getCountryCards = function (arr) {
        let result = [];
        arr.forEach(el => {
            result.push(this._cards({ ...el, ...el.media }));
        })
        return result;
    }

    _cards = function ({ name, capital, abbreviation, currency, phone, population, flag, emblem, orthographic }) {
        return `
            <article class="card show">
                <div class="thumb">
                    <img src="${emblem}"
                        alt="">
                </div>
                <div class="infos">
                    <h2 class="title">${name}<span class="flag"><img
                                src="${flag}"
                                alt=""> </span></h2>
                    <h3 class="date">capital - ${capital}</h3>
                    <h3 class="seats">Abbreviation: "${abbreviation}"</h3>
                    <p class="txt">
                        Currency: "${currency}" <br>
                        Phone: ${phone} <br>
                        Population: ${population}
                        <img src="${orthographic}"
                            alt="">
                    </p>
                </div>
            </article>
        `;
    }


    _filterItems() {
        const titles = document.querySelectorAll(".title");
        const inputEl = document.querySelector(".country_input");

        let items = document.querySelectorAll(".show");
        this._pagination(items);

        inputEl.addEventListener("input", (e) => {
            let inputValue = e.target.value.toLowerCase();
            titles.forEach(title => {
                let parrentEl = title.closest(".card");
                if (title.textContent.toLowerCase().includes(inputValue)) {
                    parrentEl.classList.add("show");
                    parrentEl.classList.remove("hide");
                } else {
                    parrentEl.classList.add("hide");
                    parrentEl.classList.remove("show");
                }
            });

            items = document.querySelectorAll(".show");
            this._pagination(items);
            
        });
    }

    _pagination(items) {
        this._generateLinks(items);
        const paginationLinks = document.querySelectorAll(".pagination a");
        this._showItems(items, 0);
        this._getActive(paginationLinks, 0);
        this._toCut();
        paginationLinks.forEach((link, index, arr) => {
            link.addEventListener("click", (e) => {
                this._getActive(arr, index);
                this._showItems(items, index);
                this._toCut();
            })
        })
    }

    _showItems(items, i) {
        items.forEach((item, index) => {
            if (i * 10 <= index && index < (i + 1) * 10) {
                item.classList.add("show");
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
                item.classList.remove("show");
            }
        });
    }

    _getActive(links, i) {
        links.forEach((link, index) => {
            link.classList.remove("active");
            if (index == i) {
                link.classList.add("active");
            }
        });
    }
    _generateLinks(items) {
        let html = "";
        let i = Math.ceil(items.length / 10);

        if (i <= 1) {
            this.paginationEl.innerHTML = html;
            return;
        }
        for (let k = 1; k <= i; k++) {
            html += `<a href="#">${k}</a>\n`;
        }
        this.paginationEl.innerHTML = html;
    }

    _toCut() {
        let more1 = document.createElement("p");
        more1.classList.add("more");
        more1.textContent = ". . . .";

        let more2 = document.createElement("p");
        more2.classList.add("more");
        more2.textContent = ". . . .";


        let linkEl = document.querySelector(".pagination").children;
        let arr = document.querySelectorAll(".pagination>a");
    
        for (let i = 0; i < linkEl.length; i++) {
            if(linkEl[i].classList.contains("more")) {
                linkEl[i].remove();
            }
        }

        let index;
        for (let i = 0; i < linkEl.length; i++) {
            if (linkEl[i].classList.contains("active")) {
                index = i;
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (index - 2 > i || index + 2 < i) {
                arr[i].classList.add("hide");
                arr[i].classList.remove("show");
            } else {
                arr[i].classList.add("show");
                arr[i].classList.remove("hide");
            }

            if (i == arr.length - 1 || i == arr.length - 2 || i == 0 || i == 1) {
                arr[i].classList.add("show");
                arr[i].classList.remove("hide");
            }
        }

        if (index >= 5) {
            arr[index].previousElementSibling.previousElementSibling.insertAdjacentElement("beforebegin", more1);
        }
        if (index <= arr.length-5) {
            arr[index].nextElementSibling.nextElementSibling.insertAdjacentElement("afterend", more2);
        }
        
    }
    

}

export { Countries };