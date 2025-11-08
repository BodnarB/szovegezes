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
        1: "Riccardo Piscitelli",
        3: "André Duarte",
        5: "David Kobouri",
        6: "Damian Rasak",
        7: "Giorgi Beridze",
        8: "Arijan Ademi",
        9: "Fran Brodić",
        10: "Tajti Mátyás",
        11: "Horváth Krisztofer",
        15: "Tiago Goncalves",
        17: "Aljosa Matko",
        18: "Tom Lacoux",
        22: "Tamás Krisztián",
        23: "Banai Dávid",
        26: "Geiger Bálint",
        30: "Joao Nunes",
        31: "Dombó Dániel",
        32: "George Ganea",
        33: "Bese Barnabás",
        34: "Milan Tucic",
        39: "Gleofilo Vlijter",
        44: "Gergényi Bence",
        45: "Iuri Medeiros",
        46: "Mándi Naruki Milán",
        55: "Fiola Attila",
        74: "Kaczvinszki Dominik",
        88: "Matija Ljujic"
    },
    guest: {
        2: "Stefan Vladoiu",
        4: "Nils Oscar Alexander Abrahamsson",
        5: "Paul-Viorel Anton",
        6: "Tóth Rajmund",
        7: "Ahmed Nadhir Benbouali",
        10: "Claudiu-Vasile Bumba",
        11: "Nfansu Njie",
        16: "Megyeri Balázs",
        17: "Schön Szabolcs",
        18: "Senna Miangue",
        19: "Oleksandr Pyshchur",
        20: "Bíró Barnabás",
        21: "Csinger Márk",
        23: "Stéfli Dániel",
        24: "Miljan Krpic",
        25: "Deian Boldor",
        27: "Vitális Milán",
        37: "Urblik Norbert",
        39: "Herczeg Marcell",
        47: "Décsy Ádám",
        64: "Brecska Dániel",
        70: "Tollár Imre Adrián",
        76: "Jovan Zivkovic",
        80: "Zeljko Gavric",
        90: "Bánáti Kevin",
        96: "Huszár Marcell",
        99: "Petrás Sámuel"
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
szovegTextbox.value = `X, az Újpest és Y, a Győr játékosa a labdarúgó Fizz Liga 13. fordulójában játszott Újpest FC - ETO FC mérkőzésen a Szusza Ferenc Stadionban 2025. november 8-án. `

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