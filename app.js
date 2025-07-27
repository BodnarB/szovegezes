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
let currentEvent = 'harmadik szabadedzésén'

let csapatok = {
    home: {},
    guest: {}
}


// ideiglenes SBK-ra
szovegTextbox.value = ` a gyorsaságimotoros Superbike-világbajnokság magyarországi futamának ${currentEvent} a balatonfőkajári Balaton Park Circuit versenypályán 2025. július 27-én.`

eventValue.addEventListener('change', () => {
    currentEvent = eventValue.options[eventValue.selectedIndex].text
    szovegTextbox.value = ` a gyorsaságimotoros Superbike-világbajnokság magyarországi futamának ${currentEvent} a balatonfőkajári Balaton Park Circuit versenypályán 2025. július 27-én.`
})
// ideiglenes SBK-ra



fetch('./tempteam.json')
    .then(response => response.json())
    .then(data => {
        storedTeam = data
        homeTeamText.value = storedTeam.join('\n')
        csapatok.home = parseCsapat(homeTeamText.value)
    })


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

// ideiglenes SBK-ra
// teamLoadBtn.addEventListener('click', () => {
// homeTeamText.value = storedTeam.join('\n')
// csapatok.home = parseCsapat(homeTeamText.value)
// })
// ideiglenes SBK-ra

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