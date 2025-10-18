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
        8: "Daniel Mosindi",
        11: "Baptiste Damatrin",
        12: "Székely Márton",
        13: "Josip Sarac",
        17: "Ignacio Plaza Jimenez",
        19: "Éles Benedek",
        21: "Andó Arián",
        22: "Papp Tamás",
        24: "Sztraka Dániel",
        26: "Pedro Rodríguez Alvarez",
        30: "Demis Cosmin Grigoras",
        54: "Matej Havran",
        78: "Vajda Huba",
        88: "Krakovszki Bence",
        89: "Dmitry Zhitnikov",
        96: "Patrick Andre Toniazzo Lemos"
    },
    guest: {
        1: "Halvor-Elias Naerland",
        2: "Ole Naerland",
        8: "Andreas Horst Haugseng",
        9: "Rassin Haugseng",
        10: "Tord Haugseng",
        11: "Theodor Svensgard",
        12: "Joachim Soholm Christensen",
        13: "Tord Aksnes Lode",
        28: "Casper Sundsbak-Gullaksen",
        30: "John Thue",
        37: "Bo Kristian Kverme",
        66: "Eirik Gausland Aunet",
        67: "Lars Sigve Hamre",
        96: "Vetle Mellemstrand Bore"
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
szovegTextbox.value = `X, a Tatabánya (j) és Y, a Naerbö játékosa a férfi kézilabda Európa Kupa második fordulójában játszott MOL Tatabánya KC - Naerbö IL visszavágó mérkőzésen a Tatabányai Multifunkciós Csarnokban 2025. október 18-án. `

// eventValue.addEventListener('change', () => {
//     currentEvent = eventValue.options[eventValue.selectedIndex].text
//     szovegTextbox.value = `X a MotoGP Magyar Nagydíj ${currentEvent} a balatonfőkajári gyorsaságimotoros-világbajnokságon, a Balaton Park Circuit versenypályán 2025. augusztus 24-én.`
// })
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