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
        2: "Csollák Márkó Ámor",
        6: "Molnár Bálint",
        8: "Szabó Bence",
        12: "Stipsicz Bence",
        13: "Nagy Krisztián",
        16: "Hári János",
        17: "Kiss Roland",
        18: "Ravasz Csanád",
        23: "Hadobás Zétény Tibor",
        26: "Galajda Zsombor",
        28: "Bartalis István",
        33: "Horváth Milán",
        34: "Terbócs István",
        36: "Erdély Csanád",
        41: "Dobos Mihály Bendegúz",
        52: "Szabó Rácz Maxim ",
        55: "Ortenszky Tamás",
        61: "Vincze Péter",
        67: "Horváth Donát Dominik",
        68: "Farkas László",
        71: "Mattyasovszky Gergely"
    },
    guest: {
        4: "Mateusz Zielinski",
        6: "Bartosz Florczak",
        9: "Olaf Bizacki",
        11: "Jakub Slusarczyk",
        12: "Karol Bilas",
        14: "Dominik Pas",
        15: "Damian Tyczynski",
        17: "Kamil Gorny",
        20: "Szymon Kielbicki",
        21: "Dominik Jarosz",
        24: "Oskar Jaskiewicz",
        26: "Jakub Lewandowski",
        28: "Mateusz Michalski",
        51: "Jakub Wanacki",
        59: "Michal Naróg",
        71: "Sebastian Brynkus",
        86: "Lukasz Krzemien",
        88: "Alan Lyszczarczyk",
        95: "Patryk Wronka",
        98: "Patryk Krezolek"
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
szovegTextbox.value = `Y (j) és a lengyel X a jégkorongozók Sárközy Tamás Emléktornájának 3. fordulójában játszott Magyarország - Lengyelország mérkőzésen a budapesti Tüskecsarnokban 2025. december 14-én.`

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