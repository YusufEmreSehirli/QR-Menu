import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";
//* sayfa yüklendiğinde fonksiyonu çalıştır 
document.addEventListener("DOMContentLoaded", () => {
    renderMenuItems(menu);
    renderButtons();
});

elements.buttonsArea.addEventListener("click", searchCategory);

function renderMenuItems(menuItems) {
    /*
    -dizideki her bir obje için bir elemanı temsil eden html elemanı oluşturur
    -bu html i bir diziye aktarır
    */
    let menuHTML = menuItems.map((item) => {
        return `
        <a id="card" href="productDetail.html?id=${item.id}"
            class="text-decoration-none text-black d-flex flex-column gap-2 flex-md-row">
            <img src=${item.img} alt="" class="rounded shadow">
            <div>
                <div class="d-flex justify-content-between">
                    <h5>${item.title}</h5>
                    <p class="text-success">${calculatePrice(item.price)} ₺</p>
                </div>
                <p class="lead">
                    ${item.desc}
                </p>
            </div>
        </a>
        `;

    });

    //diziyi stringe çevirme
    menuHTML = menuHTML.join("");
    elements.mainArea.innerHTML = menuHTML;

};


function searchCategory(e) {
    const category = e.target.dataset.category;
    //tüm elemanlardan categorysi butonla eş olanları getirir
     const filtredMenu = menu.filter((item)=> item.category === category );
     if(category === "all"){
        renderMenuItems(menu);
     }else{
     renderMenuItems(filtredMenu);
    }
    //butonları güncellemek
    renderButtons(category)
};

//ekrana butonları basma
function renderButtons(active) {
    //eski butonları kaldırma
    elements.buttonsArea.innerHTML = "";
    buttonsData.forEach((btn) => {
        //html butonunu oluştruduk
        const buttonEle = document.createElement("button");
        //buton elementine clas ekleme
        buttonEle.className = "btn btn-outline-dark filter-btn";
        //yazıyı değiştirme
        buttonEle.textContent = btn.text;
        //hangi kategori bilgisini ekleme
        buttonEle.dataset.category = btn.value;
        //eğer active ise farklı class ata 
        if (btn.value === active) {
            buttonEle.classList.add("bg-dark", "text-light");
        }

        elements.buttonsArea.appendChild(buttonEle);
    });
};