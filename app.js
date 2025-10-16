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
        1: "Milica Kostic",
        3: "Hanász Vanda",
        4: "Túróczy Anna",
        5: "Brigita Goder",
        6: "Andjela Frajtovic",
        7: "Zágonyi Barbara",
        8: "Nyul Petra",
        10: "Diószegi Fanni",
        11: "Milagros Diaz",
        13: "Gágyor Zille",
        14: "Fenyvesi Evelin",
        18: "Czinege Eszter",
        19: "Kovács Petra",
        20: "Ott Eszter",
        21: "Major Janka",
        22: "Barti Luca",
        23: "Németh Adél",
        24: "Alesia Garcia",
        25: "Nagy Viktória",
        27: "Jadyn Edwards",
        32: "Gégény Petra",
        33: "Kovács Eszter",
        45: "Bozsik Linett",
        48: "Nagy Vanessza",
        58: "Vlada Kubassova",
        88: "Czellér Dorottya"
    },
    guest: {
        3: "Dominika Huvarová",
        4: "Hallie Bergford",
        5: "Katenna Kotrcová",
        7: "Antonie Stárová",
        8: "Sára Keresová",
        9: "Eva Bartonová",
        10: "Aneta Pochmanová",
        11: "Michaela Khyrová",
        12: "Eliska Sonntagová",
        13: "Reagan Bridges",
        15: "Tinatin Ambalia",
        16: "Tori Hansen",
        17: "Radka Paulenová",
        18: "Stella Balázsová",
        19: "Laura Retkesová",
        21: "Adéla Trachtová",
        22: "Franny Cerná",
        23: "Elizabeth Ospeck",
        24: "Klára Danícková",
        25: "Victoria Havalec",
        26: "Denisa Rancová",
        27: "Julie Freislerová",
        28: "Sára Straková",
        30: "Somea Polozen",
        42: "Jovana Dukic",
        44: "Nikola Harantová"
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
szovegTextbox.value = `X, a Ferencváros (b) és Y, a Sparta Praha játékosa a női labdarúgó Európa Kupa selejtezőjének második fordulójában játszott  FTC-Telekom - Sparta Praha visszavágó mérkőzésen a III. kerületi TVE Sporttelepen 2025. október 16-án. `

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