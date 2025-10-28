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
        50: "Bátori Bence",
        51: "Joao Pedro Coimbra Serra Fernandes",
        52: "Csorba Tamás",
        53: "Dala Döme Máté",
        54: "Bogdan Durdic",
        55: "Angelos Foskolos",
        56: "Gábor Lőrinc",
        57: "Gyárfás Tamás Balázs",
        58: "Lakatos Soma Benjamin",
        59: "Mizsei Márton Zoltán",
        60: "Ragács Benedek",
        61: "Selley-Rauscher Domonkos",
        62: "Sudár Levente",
        63: "Szalai Péter Miklós",
        64: "Tasi Dominik",
        65: "Tóth Márton Zétény",
        66: "Varnai Kristóf",
        67: "Vida Zalán"
    },
    guest: {
        50: "Joánisz Alafragkisz",
        51: "Angyal Dániel",
        52: "Joánisz Arapidisz",
        53: "Dimitriosz Dimu",
        54: "Joánisz Funtulisz",
        55: "Konsztantinosz Geniduniasz",
        56: "Nikolaosz Gkillasz",
        57: "Konsztantinosz Guvisz",
        58: "Konsztantinosz Kakarisz",
        59: "Szpiridon Likudisz",
        60: "Dimitriosz Nikolaidisz",
        61: "Alekszandrosz Papanasztasziu",
        62: "Evangelosz Purosz",
        63: "Panajotisz Corcatosz",
        64: "Emmanuil Zerdevasz",
        65: "Zalánki Gergő"
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
szovegTextbox.value = `X, a Vasas (b) és Y, az Olimpiakosz játékosa a férfi vízilabda Bajnokok Ligája csoportkörének második fordulójában játszott VasasPlaket - Olimpiakosz mérkőzésen a Komjádi Uszodában 2025. október 28-án.  `

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