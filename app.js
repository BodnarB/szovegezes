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
        11: "Daria Dmitrieva",
        13: "Janurik Kinga",
        18: "Mette Tranborg",
        20: "Emily Vogel",
        21: "Márton Gréta",
        22: "Orlane Kanor",
        26: "Antje Angela Malestein",
        38: "Simon Petra Anna",
        41: "Balázs Bítia",
        42: "Klujber Katrin Gitta",
        51: "Vilde Mortensen Ingstad",
        58: "Bordás Réka",
        72: "Dragana Cvijic",
        98: "Szilágyi Diána"
    },
    guest: {
        4: "Julie Mathiesen Scaglione",
        5: "Emilie Hegh Arntzen",
        6: "Cecilie Hojgaard Brandt",
        7: "Stine Ruscetta Skogrand",
        8: "Jamina Roberts",
        12: "Filippa Idéhn",
        14: "Emma Lindqvist",
        16: "Amalie Milling",
        17: "Simone Cathrine Petersen",
        22: "Laerke Nolsoe Pedersen",
        23: "Lina Thorstein Lützhoft",
        24: "Béatrice Edwige",
        27: "Thea Kylberg",
        77: "Line Mai Norgaard Hougaard"
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
szovegTextbox.value = `X, a Ferencváros (b) és Y, az Ikast Handbold a női kézilabda Bajnokok Ligája B csoportjának 6. fordulójában játszott FTC-Rail Cargo Hungaria - Ikast Handbold mérkőzésen az Érd Arénában 2025. november 1-jén. `

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