const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text"),
      menu = body.querySelector(".menu");


// alert(menu)

menu.addEventListener('click', function(e) {
    alert('click');
    const targetMenu = e.target;
    // console.log(targetMenu)
    if(targetMenu.classList.contains('menu__link') || targetMenu.classList.contains('text nav-text')) {
        const spanLinkActive = document.querySelector("text nav-text");
        console.log(spanLinkActive)
        const menuLinkActive = document.querySelector("ul li a.active");
        console.log(menuLinkActive)
        if(menuLinkActive !== null && targetMenu.getAttribute('href') !== menuLinkActive.getAttribute('href')) {
            menuLinkActive.classList.remove('active');
        }
        targetMenu.classList.add('active');
    }
})

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

