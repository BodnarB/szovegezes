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
        1: "Pécsi Ármin",
        2: "Yaakobishvili Antal",
        3: "Markgráf Ákos",
        4: "Fenyő Noah",
        5: "Dragóner Áron",
        6: "Vingler László",
        7: "Vajda Botond",
        8: "Szűcs Tamás",
        9: "Okeke Michael",
        10: "Jurek Gábor",
        11: "Molnár Ádin",
        12: "Dala Martin",
        13: "Kovacs Patrik",
        14: "Bodnár János",
        15: "Kaczvinszki Dominik",
        16: "Dusinszki Szabolcs",
        17: "Dénes Csánád Vilmos",
        18: "Horváth Kevin",
        19: "Farkas Bendegúz",
        20: "Tuboly Máté",
        21: "Átrok István",
        22: "Lehoczki Bendegúz",
        23: "Bánáti Kevin"
    },
    guest: {
        1: "Toni Silic",
        2: "Simun Hrgovic",
        3: "Dominik Prpic",
        4: "Luka Vuskovic",
        5: "Teo Barisic",
        6: "Luka Hodak",
        7: "Marin Soticek",
        8: "Adriano Jagusic",
        9: "Leon Grgic",
        10: "Lovro Zvonarek",
        11: "Fabijan Krivak",
        12: "Josip Cundekovic",
        13: "Matia Barzic",
        14: "Ivan Katic",
        15: "Branko Pavic",
        16: "Ante Kavelj",
        17: "Luka Tunjic",
        18: "Branimir Miacic",
        19: "Fran Topic",
        20: "Domagoj Bukvic",
        23: "Jozo Vukman"
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
szovegTextbox.value = `X (b) és a horvát Y a labdarúgó U21-es Európa-bajnokság selejtezőjének H csoportjában játszott Magyarország - Horvátország mérkőzésen az Új Hidegkuti Nándor Stadionban 2025. november 18-án. `

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