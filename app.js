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
        1: "Demjén Patrik",
        2: "Varju Benedek",
        3: "Szépe János",
        4: "Beriashvili Ilia",
        5: "Lehoczky Roland",
        6: "Kata Mihály",
        7: "Molnár Ádin",
        8: "Németh Hunor",
        10: "Bognár István",
        11: "Jurina Marin",
        12: "Bene Domonkos",
        14: "Horváth Artúr",
        15: "Széles Imre",
        16: "Törőcsik Péter",
        17: "Polievka Robert",
        18: "Németh Krisztián",
        20: "Kereszi Zalán",
        21: "Átrok István Zalán",
        22: "Bévárdi Zsombor",
        23: "Plsek Jakub",
        24: "Fadgyas Tamás",
        25: "Kádár Tamás",
        27: "Kovács Patrik",
        28: "Szűcs Patrik",
        29: "Balázs József",
        30: "Vitályos Viktor"
    },
    guest: {
        1: "Riccardo Piscitelli",
        4: "Fehér Csanád",
        5: "Daviti Kobouri",
        6: "Damian Rasak",
        7: "Giorgi Beridze",
        8: "Arijan Ademi",
        9: "Fran Brodic",
        10: "Tajti Mátyás",
        11: "Horváth Krisztofer",
        15: "Tiago Goncalves",
        17: "Alijos Matko",
        18: "Tom Lacoux",
        21: "Helmich Pál",
        22: "Tamás Krisztián",
        23: "Banai Dávid",
        26: "Geiger Bálint",
        30: "Joao Nunes",
        31: "Dombó Dávid",
        32: "George Ganea",
        33: "Bese Barnabás",
        34: "Milan Tutic",
        38: "Matija Ljujic",
        39: "Gleofilo Vlijter",
        44: "Gergényi Bence",
        45: "Iuri Medeiros",
        46: "Mándi Naruki Milán",
        55: "Fiola Attila",
        74: "Kaczvinszki Dominik"
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
szovegTextbox.value = `X, az MTK (b) és Y, az Újpest játékosa a labdarúgó Fizz Liga 17. fordulójában játszott MTK Budapest - Újpest FC mérkőzésen az Új Hidegkuti Nándor Stadionban  2025. december 13-án.`

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