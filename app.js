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
        1: "Szakonyi Dániel",
        2: "Dusan Mandic",
        3: "Manhercz Krisztián",
        4: "Nagy Ákos",
        5: "Vámos Márton",
        6: "Edoardo Di Somma",
        7: "Fekete Gergő",
        8: "Sztilianósz Arjirópulosz Kanakákisz",
        9: "Varga Vince",
        10: "Vigvári Vendel",
        11: "Jansik Szilárd",
        12: "Miguel de Toro Domínguez",
        13: "Vogel Soma",
        14: "Vismeg Zsombor"
    },
    guest: {
        1: "Gianmarco Nicosia",
        2: "Francesco Di Fulvio",
        3: "Alvaro Granados Ortega",
        4: "Giacomo Cannella",
        5: "Andrea Fondelli",
        6: "Lukas Durik",
        7: "Nicholas Presciutti",
        8: "Luke Anthony Pavillard",
        9: "Matteo Iocchi Gratta",
        10: "Rino Buric",
        11: "Francesco Condemi",
        12: "Maxwell Bruce Irving",
        13: "Tommaso Negri",
        14: "Francesco Cassia"
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
szovegTextbox.value = `X, a Ferencváros és Y, a Pro Recco játékosa a férfi vízilabda Európai Szuperkupa döntőjében játszott FTC-Telekom Waterpolo - Pro Recco mérkőzésen a Komjádi Uszodában 2025. október 8-án. `

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