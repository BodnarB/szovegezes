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
        21: "Major Janka",
        22: "Barti Luca",
        4: "Túróczy Anna",
        5: "Brigita Goder",
        6: "Andjela Frajtovic",
        8: "Nyul Petra",
        13: "Gagyor Zille",
        20: "Ott Eszter",
        23: "Németh Adél",
        3: "Hanász Vanda",
        7: "Zágonyi Barbara",
        11: "Milagros Diaz",
        14: "Fenyvesi Evelin",
        19: "Kovács Petra",
        27: "Jadyn Edwards",
        33: "Kovács Eszter",
        45: "Bozsik Linett",
        88: "Czellér Dorottya",
        10: "Diószegi Fanni",
        18: "Czinege Eszter",
        24: "Alesia Garcia",
        25: "Nagy Viktória",
        32: "Gégény Petra",
        48: "Nagy Vanessza",
        58: "Vlada Kubassova"
    },
    guest: {
        1: "Tove Enblom",
        24: "Pia Grinde-Hansen",
        31: "Thiril Erichsen",
        2: "Sara Horte",
        3: "Michaela Kovacs",
        5: "Selma Pettersen",
        28: "Arna Eiriksdottir",
        6: "Tilde Lindwall",
        7: "Naina Inauen",
        8: "Linn Vickius",
        10: "Olaug Tvedten",
        15: "Ylinn Tennebo",
        16: "Ronja Arnesen",
        17: "Ronja Aronsson",
        19: "Saedis Heidarsdottir",
        23: "Eline Hegg",
        25: "Synne Hansen",
        29: "Marika Bergman-Lundin",
        30: "Stine Brekken",
        9: "Elise Thorsnes",
        11: "Marie Preus",
        14: "Mawa Sesay",
        21: "Karina Saevik",
        22: "Tommine Enger"
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
szovegTextbox.value = `X, a Ferencváros (j) és Y, a Valerenga játékosa a női labdarúgó Bajnokok Ligája selejtezőjének harmadik fordulójában játszott FTC-Telekom - Valerenga FC mérkőzésen a III. kerületi TVE Sporttelepen 2025. szeptember 18-án. `

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