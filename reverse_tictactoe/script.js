// Init
let tab = [];
let submit = document.getElementById("submit");
let score = [0, 0];
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let check = document.getElementsByClassName("check");
  let error_count = 0;
  for (let i = 0; i < check.length; i++) {
    let value = check[i].value;
    if (value.length == 0) {
      error_count++;
    }
  }
  if (error_count > 0) {
    document.getElementById("error").textContent =
      "Une ou plusieurs entrées sont vides.";
  } else {
    document.getElementById("starter").style.display = "none";
    document.getElementById("container").style.display = "flex";

    tab.push(check[0].value);
    tab.push(check[1].value);
    document.getElementById(
      "score"
    ).textContent = `${tab[0]} : ${score[0]} || ${tab[1]} : ${score[1]}`;
  }
});
let turn = Math.floor(Math.random() * 2);

let elems = document.getElementsByClassName("element");
let virtual_table = [
  ["aa", "bb", "cc"],
  ["11", "22", "33"],
  [11, 22, 33],
];

const win = (turn) => {
  let popup = document.getElementById("popup");

  popup.style.display = "block";
  document.getElementById("container").style.display = "none";

  let wanna_continue = document.getElementsByClassName("play_again");

  const reset = () => {
    for (let i = 0; i < wanna_continue.length; i++) {
      wanna_continue[i].addEventListener("click", () => {
        let value = wanna_continue[i].textContent.toLowerCase().trim();

        if (value == "oui") {
          popup.style.display = "none";
          document.getElementById("container").style.display = "flex";
          virtual_table = [
            ["aa", "bb", "cc"],
            ["11", "22", "33"],
            [11, 22, 33],
          ];
          for (let k = 0; k < elems.length; k++) {
            elems[k].textContent = "";
          }
        } else if (value == "non") {
          score = [0, 0];
          popup.style.display = "none";
          document.getElementById("starter").style.display = "flex";
          document.getElementById("container").style.display = "none";
          virtual_table = [
            ["aa", "bb", "cc"],
            ["11", "22", "33"],
            [11, 22, 33],
          ];
          for (let k = 0; k < elems.length; k++) {
            elems[k].textContent = "";
          }
        }
      });
    }
  };

  const text_reset = (text) => {
    document.getElementById("winner").textContent = text;
    document.getElementById(
      "current_score"
    ).textContent = `${tab[0]} : ${score[0]} || ${tab[1]} : ${score[1]}`;
    document.getElementById(
      "score"
    ).textContent = `${tab[0]} : ${score[0]} || ${tab[1]} : ${score[1]}`;
  };
  if (turn == "draw") {
    text_reset("Personne n'a gagné");
    reset();
  } else {
    score[turn] += 1;
    let n_turn = 0;
    if (turn == 1) {
      n_turn = 0;
    } else {
      n_turn = 1;
    }
    text_reset(
      `${tab[turn]} a gagné (${tab[n_turn]} a aligné trois jetons, dommage ...)`
    );
    reset();
  }
};

const check = (turn) => {
  const consider = virtual_table;
  let cpt = 0;
  for (let i = 0; i < virtual_table.length; i++) {
    for (let j = 0; j < virtual_table[i].length; j++) {
      if (virtual_table[i][j].length == 1) {
        cpt++;
      }
    }
  }

  if (consider[0][0] == consider[0][1] && consider[0][1] == consider[0][2]) {
    return win(turn);
  }
  if (consider[1][0] == consider[1][1] && consider[1][1] == consider[1][2]) {
    return win(turn);
  }
  if (consider[2][0] == consider[2][1] && consider[2][1] == consider[2][2]) {
    return win(turn);
  }
  if (consider[0][0] == consider[1][0] && consider[1][0] == consider[2][0]) {
    return win(turn);
  }
  if (consider[0][1] == consider[1][1] && consider[1][1] == consider[2][1]) {
    return win(turn);
  }
  if (consider[2][0] == consider[2][1] && consider[2][1] == consider[2][2]) {
    return win(turn);
  }
  if (consider[0][0] == consider[1][1] && consider[1][1] == consider[2][2]) {
    return win(turn);
  }
  if (consider[0][2] == consider[1][1] && consider[1][1] == consider[2][0]) {
    return win(turn);
  }
  if (cpt == 9) {
    return win("draw");
  }
};

let container = document.getElementById("container");
for (let i = 0; i < 3; i++) {
  let new_child = document.createElement("div");
  new_child.setAttribute("class", "child");
  for (let j = 0; j < 3; j++) {
    let new_element = document.createElement("button");
    new_element.setAttribute("class", "element");
    new_element.setAttribute("data-coords", `${i}|${j}`);
    new_child.appendChild(new_element);
  }
  container.appendChild(new_child);
}

for (let i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", () => {
    let actual_value = elems[i].getAttribute("data-coords").split("|");
    if (elems[i].textContent.length != 0) {
      return alert("Cette case est déjà prise.");
    }
    const change = (t) => {
      virtual_table[actual_value[0]][actual_value[1]] = tab[turn];
      elems[i].textContent = tab[turn];
      turn = t;
      check(turn);
    };
    switch (turn) {
      case 0:
        change(1);
        break;
      case 1:
        change(0);
        break;
    }
  });
}

document.getElementById("principe").addEventListener("click", () => {
  return alert(
    "Ce jeu est le total inverse du morpion, le but du jeu est de faire aligner trois jetons a votre adversaire, ainsi vous gagnez le round. Bon jeu à vous !"
  );
});
