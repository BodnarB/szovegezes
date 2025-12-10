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
        4: "Tóvizi Petra",
        5: "Csíkos Luca",
        9: "Hársfalvi Júlia",
        10: "Faragó Lea",
        11: "Albek Anna",
        17: "Falusi-Udvardi Laura",
        18: "Kovács Anett",
        19: "Márton Gréta",
        20: "Szmolek Apollónia",
        28: "Papp Nikoletta",
        31: "Szemerey Zsófi",
        38: "Vámos Petra",
        42: "Klujber Katrin",
        58: "Bordás Réka",
        59: "Kuczora Csenge",
        61: "Janurik Kinga",
        74: "Bukovszky Anna",
        77: "Simon Petra",
        88: "Grosch Vivien"
    },
    guest: {
        4: "Alieke Van Maurik",
        8: "Lois Abbingh",
        9: "Larissa Nüsser",
        12: "Bo Van Wetering",
        14: "Judith Van Der Helm",
        18: "Kelly Dulfer",
        19: "Merel Freriks",
        22: "Zoë Sprengers",
        24: "Romée Maarschalkerweerd",
        26: "Angela Malestein",
        30: "Rinka Duijndam",
        31: "Kelly Vollebregt",
        38: "Yara Ten Holte",
        44: "Nikita Van Der Vliet",
        48: "Dione Housheer",
        79: "Estavana Polman"
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
szovegTextbox.value = `XXXXX (b) és a holland YYYYY (j) a német-holland közös rendezésű női kézilabda-világbajnokság negyeddöntőjében a Hollandia - Magyarország mérkőzésen a rotterdami Ahoy Arénában 2025. december 10-én`

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