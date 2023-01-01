let hours = document.getElementById("hours")
let minutes = document.getElementById("minutes")

const actDate = () => {
  let date = new Date()
  let act_hours = date.getHours()
  if (act_hours > 12) {
    act_hours -= 12
  }
  let act_minutes = date.getMinutes()
  let coef_hours = act_hours / 12;

  let coef_minutes = act_minutes / 60;
  hours.style.transform = `rotate(${(coef_hours*360 + coef_minutes * 30) - 90}deg)`
  minutes.style.transform = `rotate(${coef_minutes*360 - 90}deg)`
}
for (let i = 0; i < 12; i++) {
  let a = document.getElementById("a")
  let new_el = document.createElement("div")
  new_el.classList.toggle("b")

  let new_p = document.createElement("p")
  new_p.classList.toggle("realigner")
  new_p.textContent = i


  new_el.style.transform = `rotate(${30*i - 90}deg)`
  //  new_p.style.transform = `rotate(${0}deg)`
    new_el.appendChild(new_p)
  a.appendChild(new_el)
}
setInterval(actDate, 1000)
