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
        2: "Sperka László",
        3: "Mousavi Pour Seyed Amir Reza",
        4: "Balajthy Balázs",
        6: "Benkő Márton",
        7: "Tóth Marcell",
        8: "Vágvölgyi Sándor",
        9: "Miskolczi Barnabás",
        10: "Adi Bence",
        11: "Szogolovszkij Sámuel",
        13: "Meszlényi Áron Bálint",
        14: "Hughes Bence",
        17: "Orlai Márton",
        18: "Kurcz Balázs",
        19: "Vincze Martin",
        21: "Ádám Dorián",
        22: "Sevinger Zsolt",
        23: "Kádár Máté",
        24: "Soóky Rómeó",
        27: "Elek Ádám",
        32: "Czerula Dávid Krisztián"
    },
    guest: {
        1: "Gyollai Dániel",
        3: "Varazdat Haroyan",
        5: "Rácz László",
        6: "Szőke Gergő",
        7: "Makrai Gábor",
        8: "Berecz Zsombor",
        9: "Blessing Eleke",
        10: "Kártik Bálint",
        11: "Martin Slogar",
        13: "Polgár Kristóf",
        14: "Rasheed Sodiq",
        15: "Major Marcell",
        17: "Prosser Dániel",
        18: "Schuszter Ronald",
        19: "Deutsch László",
        23: "Mykhailo Meskhi",
        24: "Kun Olivér",
        25: "Baranyai Nimród",
        30: "Boros Zsombor",
        38: "Sós Bence",
        42: "Könyves Norbert",
        44: "Szujó Attila",
        66: "Ferencsik Bálint",
        70: "Meshack Ubochioma",
        72: "Bánfalvi Gergő",
        78: "Balázsi Levente",
        88: "Trencsényi Bence",
        99: "Juhász Bence"
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
szovegTextbox.value = `X, a Kelen (b) és Y, a Kazincbarcika játékosa a labdarúgó MOL Magyar Kupa 4. fordulójában játszott Kelen SC - Kolorcity Kazincbarcika SC mérkőzésen a Kelen SC Sporttelepen 2025. október 29-én.  `

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