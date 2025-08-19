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
let currentEvent = 'Superpole versenyén'

let csapatok = {
    home: {
        90: "Dibusz Dénes",
        99: "Gróf Dávid",
        29: "Szécsi Gergő",
        63: "Radnóti Dániel",
        3: "Stefan Gartenmann",
        21: "Botka Endre",
        22: "Szalai Gábor",
        27: "Ibrahim Cissé",
        28: "Toon Raemaekers",
        34: "Raul Gustavo",
        44: "Ismail Aaneba",
        54: "Kaján Norbert",
        77: "Nagy Barnabás",
        5: "Naby Keita",
        15: "Mohammed Abu Fani",
        16: "Kristoffer Zachariassen",
        23: "Ötvös Bence",
        25: "Cebrail Makreckis",
        33: "Carlos Eduardo Lopes Cruz",
        36: "Gavriel Gilad Kanichowsky",
        47: "Callum O'Dowda",
        64: "Tóth Alex",
        66: "Júlio Romao",
        80: "Habib Maiga",
        88: "Philippe Rommens",
        7: "Daniel Arzani",
        8: "Aleksandar Pesic",
        10: "Jonathan Levi",
        17: "Edgar Szevikjan",
        19: "Varga Barnabás",
        20: "Adama Traoré",
        24: "Tosin Kehinde",
        30: "Gruber Zsombor",
        32: "Aleksandar Cirkovic",
        74: "Szabó Szilárd",
        75: "Lenny Joseph",
        76: "Lisztes Krisztián"
    },
    guest: {
        1: "Sahrudin Magomedalijev",
        97: "Fabijan Buntic",
        99: "Mateusz Kochalski",
        2: "Matheus Silva",
        3: "Samy Mmaee",
        13: "Bahlul Mustafazade",
        18: "Dani Bolt",
        26: "Amin Rzayev",
        30: "Abbas Hüseynov",
        44: "Elvin Jafarguliyev",
        55: "Badavi Hüseynov",
        81: "Kevin Medina",
        6: "Chris Kouakou",
        8: "Marko Jankovic",
        10: "Abdellah Zoubir",
        15: "Leandro Andrade",
        20: "Kady",
        21: "Olekszij Kascsuk",
        27: "Tural Bayramov",
        32: "Hikmat Jabrayilzade",
        35: "Pedro Bicalho",
        11: "Emmanuel Addai",
        22: "Musa Gurbanli",
        90: "Nariman Akhundzade"
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
szovegTextbox.value = `X, a Ferencváros (b) és Y, a Qarabag játékosa a labdarúgó Bajnokok Ligája selejtezőjének negyedik fordulójában játszott Ferencvárosi TC - Qarabag mérkőzésen a Groupama Arénában 2025. augusztus 19-én. `

// eventValue.addEventListener('change', () => {
//     currentEvent = eventValue.options[eventValue.selectedIndex].text
//     szovegTextbox.value = ` a gyorsaságimotoros Superbike-világbajnokság magyarországi futamának ${currentEvent} a balatonfőkajári Balaton Park Circuit versenypályán 2025. július 27-én.`
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

// ideiglenes SBK-ra
// teamLoadBtn.addEventListener('click', () => {
// homeTeamText.value = storedTeam.join('\n')
// })
// ideiglenes SBK-ra


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