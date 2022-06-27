
    let render = document.querySelector("div#render");
    let values = document.getElementsByClassName("afficher")
    let sel = document.getElementsByClassName("selector")
    let shower = document.getElementById("shower")
    let copy =  document.getElementById("copy")


    // Copy part

   copy.addEventListener("click", () => {



    navigator.clipboard.writeText(shower.textContent);
    alert("You're RGB Color has been copied !")
  
   })

    // End copy part


     function strip(red, green, blue) {
         return `rgb(${red}, ${green}, ${blue}) `
     }
     function renderer(f_v, f_n, c_v) {
         render.style.background = f_v;
         tab[f_n] = c_v
         values[f_n].textContent = c_v
        shower.textContent = f_v
     } 
 

     // Init
    
     let tab = [sel[0].value,sel[1].value,sel[2].value]
     for(let i=0;i<values.length;i++) {
         values[i].textContent = tab[i]
     }
     let init_value = strip(sel[0].value, sel[1].value, sel[2].value)
     render.style.background = init_value
   
  
     shower.textContent = init_value

     // End init


        function update(value, n) {
             switch(n) {
                 case 0: {
                     renderer(strip(value, tab[1], tab[2]), n, value)
                 }
                 break;
                 case 1: {
                     renderer(strip(tab[0], value, tab[2]), n, value)
                 }
                 break;
                 case 2: {
                     renderer(strip(tab[0], tab[1], value), n, value)
                 }
                 break;
             }
        }
