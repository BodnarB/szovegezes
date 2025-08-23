let textPreview = document.querySelector('.text-preview')
let szovegTextbox = document.querySelector('.szoveg-textbox')
let homeTeamText = document.querySelector('.home-team-text')
let guestTeamText = document.querySelector('.guest-team-text')
let teamnameH = document.querySelector('#teamname-h')
let teamnameG = document.querySelector('#teamname-g')
let mainTextCopBtn = document.querySelector('#main-text-copy')
let teamLoadBtn = document.querySelector('.team-load')
let storedTeam
let eventValue = document.querySelector('#event')


let csapatok = {
    home: {
        1: "A spanyol Jorge Martín, az Aprilia Racing versenyzője",
        5: "A francia Johann Zarco, a Castrol Honda LCR versenyzője",
        10: "Az olasz Luca Marini, a Honda HRC Castrol versenyzője",
        12: "A spanyol Maverick Vinales, a Red Bull KTM Tech3 versenyzője",
        20: "A francia Fabio Quartararo, a Monster Energy Yamaha MotoGP Team versenyzője",
        21: "Az olasz Franco Morbidelli, a Pertamina Enduro VR46 Racing Team versenyzője",
        23: "Az olasz Enea Bastianini, a Red Bull KTM Tech3 versenyzője",
        25: "A spanyol Raúl Fernández, a Trackhouse MotoGP Team versenyzője",
        33: "A dél-afrikai Brad Binder, a Red Bull KTM Factory Racing versenyzője",
        35: "A thai Somkiat Chantra, az Idemitsu Honda LCR versenyzője",
        36: "A spanyol Joan Mir, a Honda HRC Castrol versenyzője",
        37: "A spanyol Pedro Acosta, a Red Bull KTM Factory Racing versenyzője",
        42: "A spanyol Álex Rins, a Monster Energy Yamaha MotoGP Team versenyzője",
        43: "Az ausztrál Jack Miller, a Prima Pramac Yamaha MotoGP versenyzője",
        49: "Az olasz Fabio Di Giannantonio, a Pertamina Enduro VR46 Racing Team versenyzője",
        54: "A spanyol Fermín Aldeguer, a BK8 Gresini Racing MotoGP versenyzője",
        63: "Az olasz Francesco Bagnaia, a Ducati Lenovo Team versenyzője",
        72: "Az olasz Marco Bezzecchi, az Aprilia Racing versenyzője",
        73: "A spanyol Álex Márquez, a BK8 Gresini Racing MotoGP versenyzője",
        79: "A japán Ai Ogura, a Trackhouse MotoGP Team versenyzője",
        88: "A portugál Miguel Oliveira, a Prima Pramac Yamaha MotoGP versenyzője",
        93: "A spanyol Marc Márquez, a Ducati Lenovo Team versenyzője"
    },
    guest: {

    }
}


// ideiglenes kosarhoz
function csapatObjToText(csapat) {
    return Object.entries(csapat)
        .map(([mezszam, nev]) => `${mezszam} ${nev}`)
        .join('\n')
}

homeTeamText.value = csapatObjToText(csapatok.home)
guestTeamText.value = csapatObjToText(csapatok.guest)



// // ideiglenes SBK-ra
szovegTextbox.value = `X a MotoGP Magyar Nagydíj főfutamán a balatonfőkajári gyorsaságimotoros-világbajnokságon, a Balaton Park Circuit versenypályán 2025. augusztus 24-én. `

eventValue.addEventListener('change', () => {
    currentEvent = eventValue.options[eventValue.selectedIndex].text
    szovegTextbox.value = `X a MotoGP Magyar Nagydíj ${currentEvent} a balatonfőkajári gyorsaságimotoros-világbajnokságon, a Balaton Park Circuit versenypályán 2025. augusztus 24-én.`
})
// // ideiglenes SBK-ra



// fetch('./tempteam.json')
//     .then(response => response.json())
//     .then(data => {
//         storedTeam = data
//         homeTeamText.value = storedTeam.join('\n')
//         csapatok.home = parseCsapat(homeTeamText.value)
//     })


// Szöveg -> { mezszám: név } objektummá alakítás
function parseCsapat(szoveg) {
    const sorok = szoveg.split('\n')
    const csapat = {}

    sorok.forEach(sor => {
        const match = sor.match(/^(\d+)\s*[-–]?\s*(.+)$/)
        if (match) {
            const mezszam = match[1]
            const nev = match[2].trim()
            csapat[mezszam] = nev
        }
    })

    return csapat
}

homeTeamText.addEventListener('input', () => {
    csapatok.home = parseCsapat(homeTeamText.value)
})
guestTeamText.addEventListener('input', () => {
    csapatok.guest = parseCsapat(guestTeamText.value)
})


szovegTextbox.addEventListener('input', () => {
    let szoveg = szovegTextbox.value

    szoveg = szoveg.replace(/-h-/g, teamnameH.value)
    szoveg = szoveg.replace(/-g-/g, teamnameG.value)

    const newText = szoveg.replace(/(\d{1,2})([hg])/g, (match, mezszam, csapat) => {
        if (csapat === 'h' && csapatok.home?.[mezszam]) {
            return csapatok.home[mezszam]
        } else if (csapat === 'g' && csapatok.guest?.[mezszam]) {
            return csapatok.guest[mezszam]
        } else {
            return match
        }
    })

    textPreview.value = newText
})


mainTextCopBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textPreview.value)
})