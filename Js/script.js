// Animação para o menu
let link1 = document.getElementById("link1");
let linha1 = document.getElementById("linha1");
let link2 = document.getElementById("link2");
let linha2 = document.getElementById("linha2");
let link3 = document.getElementById("link3");
let linha3 = document.getElementById("linha3");
link1.addEventListener("mouseover",()=>{
    linha1.classList.add("animacao-linha");
})
link1.addEventListener("mouseout",()=>{
    linha1.classList.remove("animacao-linha");
})
link2.addEventListener("mouseover",()=>{
    linha2.classList.add("animacao-linha");
})
link2.addEventListener("mouseout",()=>{
    linha2.classList.remove("animacao-linha");
})
link3.addEventListener("mouseover",()=>{
    linha3.classList.add("animacao-linha");
})
link3.addEventListener("mouseout",()=>{
    linha3.classList.remove("animacao-linha");
})