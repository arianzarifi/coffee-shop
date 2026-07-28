function closeOverlay(overlay, nav, cart){
    overlay.classList.remove("overlay-visible");
    nav.classList.remove("right-0");
    nav.classList.add("-right-64");
    cart.classList.remove("left-0");
    cart.classList.add("-left-64");
}
function theme(){
    const toggleThemeBtns = document.querySelectorAll(".toggle-theme");

    if(localStorage.getItem("theme") === "dark"){
        document.documentElement.classList.add("dark");
    }

    toggleThemeBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            if(document.documentElement.classList.contains("dark")){
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }

        });
    });
}
function navbar(){
    const navOpenBtn = document.querySelector(".nav-icon"); 
    const navCloseBtn = document.querySelector(".nav-close-btn"); 
    const nav = document.querySelector(".nav"); 
     const overlay = document.querySelector(".overlay")
     const cart = document.querySelector(".cart");
     navOpenBtn.addEventListener("click" , () => {
     nav.classList.remove("-right-64");
     nav.classList.add("right-0");
     overlay.classList.add("overlay-visible"); 
     
    
 })
 navCloseBtn.addEventListener("click", () => {
    closeOverlay(overlay, nav, cart);
});
overlay.addEventListener("click", () => {
    closeOverlay(overlay, nav, cart);
});
 }
function submenu(){
        const submenuOpenBtn = document.querySelector(".submenu-open-btn");
        const submenu = document.querySelector(".submenu");
        submenuOpenBtn.addEventListener("click" , (e) => {
        e.currentTarget.parentElement.classList.toggle("text-orange-300");
        submenu.classList.toggle("submenu--open");
    })
}
function cart(){
      const cartOpenBtn = document.querySelector(".Cart_icon")
      const cartCloseBtn = document.querySelector(".cart-close-btn");
      const cart = document.querySelector(".cart");
      const overlay = document.querySelector(".overlay")
      const nav = document.querySelector(".nav");
       cartOpenBtn.addEventListener("click" , () => {
     cart.classList.remove("-left-64");
     cart.classList.add("left-0");
     overlay.classList.add("overlay-visible"); 
       })
     
   cartCloseBtn.addEventListener("click", () => {
    closeOverlay(overlay, nav, cart);
});
overlay.addEventListener("click", () => {
    closeOverlay(overlay, nav, cart);
});
}



theme();
navbar();
submenu();
cart();

async function getProducts() {
    const res = await fetch("../products.json") ;
    const data = await res.json();
    showProducts(data);
}
function showProducts(products){

    const container = document.querySelector(".product");

    container.innerHTML = products.map(product => `

<div class="w-full bg-white dark:bg-zinc-700 py-4 px-4 rounded-xl shadow-md dark:shadow-zinc-900/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

    <div class="relative flex justify-center">

        <img 
        src="${product.image}" 
        class="w-full h-40 sm:h-48" 
        alt="محصول">


        ${
            product.discount > 0
            ?
            `
            <span class="absolute bg-orange-300 text-white text-sm -right-2 top-2 min-[415px]:right-2 min-[415px]:top-2 py-1 px-2 rounded-xl">
                ${product.discount}%
            </span>
            `
            :
            ""
        }


    </div>


    <h3 class="mb-10 dark:text-white break-words line-clamp-2 text-sm md:text-base">
        ${product.name}
    </h3>


    ${
        product.stock
        ?
        `

        ${
            product.discount > 0
            ?
            `
            <div class="flex items-center gap-2">

                <div class="flex items-center justify-start text-emerald-600 font-bold">

                    <span class="text-sm sm:text-base">
                    ${
                    (
                    product.price -
                    (product.price * product.discount / 100)
                    ).toLocaleString()
                    }
                    </span>

                    <span class="text-[9px] sm:text-xs">
                        تومان
                    </span>

                </div>


                <div class="flex items-center justify-center gap-1 text-sm">

                    <span class="relative inline-flex items-center text-zinc-400">

                        <span class="text-[10px] sm:text-base">
                            ${product.price.toLocaleString()}
                        </span>

                        <span class="hidden sm:inline text-xs mr-1">
                            تومان
                        </span>

                        <span class="absolute left-0 right-0 top-1/2 h-[2px] bg-red-400"></span>

                    </span>

                </div>

            </div>
            `
            :
            `
            <div class="flex items-center justify-start gap-1 text-emerald-600">

                <span class="whitespace-nowrap text-sm sm:text-base">
                    ${product.price.toLocaleString()}
                </span>

                <span class="text-[9px] sm:text-xs">
                    تومان
                </span>

            </div>
            `
        }

        `
        :
        `
        <div class="text-red-400">
            <span class="text-xs sm:text-base">
                فعلا موجود نیست
            </span>
        </div>
        `
    }



    <div class="mt-7 flex items-center justify-between">


        <div class="flex items-center gap-1 sm:gap-4">

            <svg class="text-gray-500 w-4 h-4 md:w-5 md:h-5 dark:text-zinc-300 hover:text-orange-400 cursor-pointer transition-colors">

                <use href="#shopping-cart"></use>

            </svg>


            <svg class="text-gray-500 w-4 h-4 md:w-5 md:h-5 dark:text-zinc-300 hover:text-orange-400 cursor-pointer transition-colors">

                <use href="#arrows-right-left"></use>

            </svg>


        </div>



        <div class="flex items-center mr-3">


        ${Array.from({length: 5}, (_, index) => {
            const isYellow = index >= 5 - product.rating;
        
            return `
                <svg class="${
                    isYellow
                    ? "text-yellow-400"
                    : "text-gray-300"
                } w-3 h-3 md:w-5 md:h-5">
        
                    <use href="#star"></use>
        
                </svg>
            `;
        }).join("")}
        


        </div>


    </div>


</div>

`).join("");

}
getProducts();