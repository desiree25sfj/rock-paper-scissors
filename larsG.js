let spillerValg
let maskinValg
let resultat

// 1. Når bruker velger stein, saks eller papir
const steinKnapp = document.querySelector("#stein")
const saksKnapp = document.querySelector("#saks")
const papirKnapp = document.querySelector("#papir")

function gratulerVinner() {
  if (resultat === "spiller") {
    console.log("Gratulerer du vant!")
    document.body.style = "background: green"
  } else if (resultat === "maskin") {
    console.log("Bedre lykke neste gang!")
    document.body.style = "background: red"
  } else {
    console.log("Oi! Det ble uavgjort!")
    document.body.style = "background: yellow"
  }
}

function velgForMaskin() {
  const randomNumber = Math.random() * 3
  if (randomNumber < 1) {
    maskinValg = "stein"
  } else if (randomNumber < 2) {
    maskinValg = "saks"
  } else {
    maskinValg = "papir"
  }
  console.log("Maskin valgte: " + maskinValg)
}

steinKnapp.addEventListener("click", () => {
  console.log("Spiller valgte: Stein")
  spillerValg = "stein"

  // 2. Velg for maskinen
  velgForMaskin()
  
  // 3. Finn ut hvem som vant
  if (spillerValg === maskinValg) {
    resultat = "uavgjort"
  } else if (maskinValg === "papir") {
    resultat = "maskin"
  } else {
    resultat = "spiller"
  }
  
  // 4. Gratuler, kondoler, eller be om ny runde
  gratulerVinner()
})

saksKnapp.addEventListener("click", () => {
  console.log("Spiller valgte: Saks")
  spillerValg = "saks"

  // 2. Velg for maskinen
  velgForMaskin()
  
  // 3. Finn ut hvem som vant
  if (spillerValg === maskinValg) {
    resultat = "uavgjort"
  } else if (maskinValg === "stein") {
    resultat = "maskin"
  } else {
    resultat = "spiller"
  }
  
  // 4. Gratuler, kondoler, eller be om ny runde
  gratulerVinner()
})

papirKnapp.addEventListener("click", () => {
  console.log("Spiller valgte: Papir")
  spillerValg = "papir"

  // 2. Velg for maskinen
  velgForMaskin()
  
  // 3. Finn ut hvem som vant
  if (spillerValg === maskinValg) {
    resultat = "uavgjort"
  } else if (maskinValg === "saks") {
    resultat = "maskin"
  } else {
    resultat = "spiller"
  }
  
  // 4. Gratuler, kondoler, eller be om ny runde
  gratulerVinner()
})