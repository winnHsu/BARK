const dogBarkMap = {
    'th': 'Woof-woof',
    'he': 'Huff-huff',
    'in': 'Bow-wow',
    'er': 'Yap-yap',
    'an': 'Yip-yip',
    're': 'Guau-guau',
    'on': 'Ouaf-ouaf',
    'at': 'Wuff-wuff',
    'en': 'Wan-wan',
    'nd': 'Mung-mung',
    'ti': 'Gav-gav',
    'es': 'Bau-bau',
    'or': 'Blaf-blaf',
    'te': 'Au-au'
};

const letterBarkMap = {
    'a': 'A...',
    'b': 'Bark!',
    'c': 'Arf-arf',
    'd': 'Ruff-ruff',
    'e': 'Haaah',
    'f': 'Auuu',
    'g': 'Gr...',
    'h': 'Awooooo',
    'i': 'Ha-ha-ha',
    'j': 'Hav-hav',
    'k': 'Awo',
    'l': 'Oooooo',
    'm': 'Woof!',
    'n': 'Huff!',
    'o': 'O...',
    'p': 'Yip!',
    'q': 'Hau-hau',
    'r': 'Yap!',
    's': 'Bow...',
    't': 'wooow...',
    'u': 'Guau',
    'v': 'Ouaf!',
    'w': 'Wuff!',
    'x': 'Vov-vov',
    'y': 'Wan!',
    'z': 'Vau-vau'
};


function containsNegativeWord(text) {
    // Define the negative words as a regular expression pattern
    // console.log(text);
    const negativeWordsPattern = /\b(not|no|neither|never|none|null|nan|na|nor|nada|nay|without)\b/i;
    if (!negativeWordsPattern.test(text)) return text.includes("n't") || text.includes("n’t");
    else return negativeWordsPattern.test(text);
}

function translator({ initialText }) {
    const isGrrr = global.userId[1] >= 'A' && global.userId[1] <= 'Z';
    const isOdd = global.userId[2] >= 'A' && global.userId[2] <= 'Z';
    const likeBark = global.userId[3] >= 'A' && global.userId[3] <= 'Z';
    const whining = global.userId[4] >= 'A' && global.userId[4] <= 'Z';
    let dogText = '';
    let pulledOutText = initialText;
    let currentIndex = 0;

    while (currentIndex < initialText.length - 1) {
        const currentSubstring = initialText.substring(currentIndex, currentIndex + 2).toLowerCase();
        if (dogBarkMap[currentSubstring]) {
            dogText += dogBarkMap[currentSubstring] + ' ';
            pulledOutText = pulledOutText.replace(currentSubstring, '');
            currentIndex += 2;
        } else {
            currentIndex++;
        }
    }

    let dogLan = dogText.trim();

    if (dogText.trim().length < 5) {
        const cleanedPulledOutText = pulledOutText.replace(/\(([a-z]{2})\)/gi, '');
        dogText = '';
        pulledOutText = cleanedPulledOutText;
        currentIndex = 0;

        while (currentIndex < cleanedPulledOutText.length - 1) {
            const currentSubstring = cleanedPulledOutText.substring(currentIndex, currentIndex + 1).toLowerCase();
            // console.log(currentSubstring)
            if (letterBarkMap[currentSubstring]) {
                dogText += letterBarkMap[currentSubstring] + ' ';
                pulledOutText = pulledOutText.replace(currentSubstring, '');
                currentIndex += 1;
            } else {
                currentIndex++;
            }
        }
        const words = dogText.trim().split(' ');
        dogLan = (isGrrr ? 'Grrr... ' : 'Grrrrrr... ') + words[words.length - 1];
    }
    else if (dogText.trim().length > 5 && dogText.trim().length < 10) {
        dogLan = (Math.floor(Math.random() * 2) === 1) ? dogLan : ('Bark! ' + dogLan);
    }
    else if (dogText.trim().length > initialText.length * (likeBark ? 3 : 2)) {
        dogLan = dogText.trim().split(' ').filter((_, index) => (isOdd ? index % 2 !== 0 : index % 2 === 0)).join(' ');
        if (!likeBark) dogLan = dogLan.trim().split(' ').filter((_, index) => (!isOdd ? index % 2 !== 0 : index % 2 === 0)).join(' ');
    }

    if (containsNegativeWord(initialText)) return (whining ? 'Whine, ' : 'Whimper, ') + dogLan
    return dogLan

    // random Bark!
}

export default translator;