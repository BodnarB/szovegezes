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
        2: "Szmolek Apollónia",
        4: "Tóvizi Petra",
        5: "Csíkos Luca",
        9: "Hársfalvi Júlia",
        10: "Faragó Lea",
        11: "Albek Anna",
        17: "Kukely Anna",
        18: "Kovács Anett",
        19: "Márton Gréta",
        24: "Töpfner Alexandra",
        30: "Szemerey Zsófi",
        38: "Vámos Petra",
        42: "Klujber Katrin",
        58: "Bordás Réka",
        59: "Kuczora Csenge",
        61: "Janurik Kinga",
        71: "Petrus Mirtill",
        74: "Bukovszky Anna",
        77: "Simon Petra",
        88: "Papp Nikoletta",
        98: "Grosch Vivien"
    },
    guest: {
        1: "Johanna Bundsen",
        2: "Clara Lerby",
        3: "Nina Koppang",
        7: "Linn Blohm",
        8: "Jamina Roberts",
        9: "Melissa Petrén",
        11: "Tyra Axnér",
        12: "Filippa Idéhn",
        16: "Jessica Ryde",
        19: "Anna Lagerquist",
        21: "Evelina Eriksson",
        23: "Emma Lindqvist",
        24: "Nathalie Hagman",
        27: "Thea Kylberg",
        29: "Kristin Thorleifsdóttir",
        33: "Isabel van Kerkvoorde",
        35: "Sofia Hvenfelt",
        36: "Sofie Börjesson",
        38: "Elin Hansson",
        40: "Vilma Matthijs Holmberg",
        42: "Jenny Carlson",
        49: "Olivia Löfqvist",
        52: "Charité Mumbongo",
        55: "Clara Petersson Bergsten",
        97: "Linn Hansson"
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
szovegTextbox.value = `X (b) és a svéd Y a Magyarország - Svédország női kézilabda felkészülési mérkőzésen a Tatabányai Multifunkciós Csarnokban 2025. szeptember 20-án. `

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