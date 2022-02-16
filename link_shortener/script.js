
console.log("Initialized")

const file = {
    "base_url": "localhost:5500"
}

let shortener = document.getElementById("shortener");
let lengthener = document.getElementById("lengthener");
let error_shortener = document.getElementById("error_shortener");
let error_lengthener = document.getElementById("error_lengthener");

function check(elt) {
    let error_elt = document.getElementById(`error_${elt}`)
       let elems = document.getElementsByClassName(`${elt}_content`);
        for(let i=0;i<elems.length;i++) {
            if(elems[i].value.split(" ").length > 1) {
                error_elt.textContent = `${elems[i].getAttribute("data-info")} has more than one value.`
              
         
            }
            else if(elems[i].value == "") { 
                error_elt.textContent = `${elems[i].getAttribute("data-info")} is empty.`
               
             
            }else if(elems[i].value.includes("https")) {
                error_elt.textContent = `${elems[i].getAttribute("data-info")} (https NOT ALLOWED)` 
           
            }
                
        }
        if(elt == "shortener") {
            let name = document.getElementById("name_shortener").value;
        let url = document.getElementById("url_shortener").value;
        axios.get(`http://${file['base_url']}/s/${name}/${url}`).then(res => {
            if(res.data == "This shorten already exists.") {
                error_shortener.textContent = "This shorten already exists."
            }else {
                console.log(res.data)
                error_shortener.textContent = `https://${file['base_url']}/links/${res.data.name}`
            }
        
        })
        }else if(elt == "lengthener") {
            let url = document.getElementById("url_lengthener").value;
        
            axios.get(`http://${file['base_url']}/l/${url}`).then(res =>{
                if(res.data == "This URL doesn't exists.") {
                    error_lengthener.textContent = "This URL doesn't exists."
                }else {
                    
                    error_lengthener.textContent = res.data.url
                }
            })
        }
    
    
    
    }

shortener.addEventListener("click", (e) => {
    e.preventDefault()
    check("shortener")  

   

    
})

lengthener.addEventListener("click", (e) => {
    e.preventDefault()
    check("lengthener")
})

document.addEventListener("keypress", (e) => {
    if(e.code == "!") {
        alert("EASTER EGG FOUND ! GG !")
    }
})