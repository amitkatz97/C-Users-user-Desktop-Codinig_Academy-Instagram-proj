export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    makeNameLorem,
    // resizeImage
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeNameLorem(){
    var names=['Bob_Dilen', 'Rayn_Gosting', 'Jhon_Cena', 'Michel_Jakson','Roby_Mayer', 'Melisa_Admon', 'Amir_Tzur', 'Natasha_Levayev']
    var randomIndex = Math.floor(Math.random()* names.length)
    return names[randomIndex]
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}


export const resizeImage = (file, targetWidth, targetHeight, callback) => {
    const reader = new FileReader();
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    reader.onload = function(event) {
      img.onload = function() {
        // Calculate aspect ratio
        const imgAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;
        
        let newWidth, newHeight;
        if (imgAspect > targetAspect) {
          // Image is wider than target aspect ratio
          newHeight = targetHeight;
          newWidth = Math.round(targetHeight * imgAspect);
        } else {
          // Image is taller than target aspect ratio
          newWidth = targetWidth;
          newHeight = Math.round(targetWidth / imgAspect);
        }

        // Set canvas size and draw resized image
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Draw image onto canvas and center it
        ctx.drawImage(img, (targetWidth - newWidth) / 2, (targetHeight - newHeight) / 2, newWidth, newHeight);

        // Convert canvas to data URL and call the callback
        const dataURL = canvas.toDataURL('image/jpeg');
        callback(dataURL);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };
