// Event listener for Enter key press
function handleKeyDown(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    updateTerm();
  }
}

let term = '';
const updateTerm = () => {
  term = document.getElementById('searchInput').value;
  // check term exist
  if (!term || term === '') {
    alert('Please enter a seach term');
  } else {
    const url = `https://itunes.apple.com/search?term=${term}`;
    const songContainer = document.getElementById('songs');
    while (songContainer.firstChild) {
      songContainer.removeChild(songContainer.firstChild);
    }
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        // console.log(data.results);
        const artists = data.results;
        return artists.map(result => {

          // Now create Html Element 
          var divElement = document.createElement('div'),//
            divElement2 = document.createElement('div'), //
            divElement3 = document.createElement('div'),//
            song = document.createElement('h5'),//
            img = document.createElement('img'),//
            audio = document.createElement('audio'),
            audioSource = document.createElement('source');

          divElement.className = 'col-md-4';
          divElement2.className = 'song-card';
          divElement3.className = 'card-body';
          divElement3.className = 'flex';
          song.className = 'card-title';
          audio.className = 'audio-class';

          // Now put content 
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          console.log(img);
          console.log(img.src);
          if (img.src == "https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/77/77/0a/77770abc-c365-81d2-0ad1-439d29e2794e/18UMGIM36518.rgb.jpg/100x100bb.jpg") {
             img.src = 'music_image.jpg';
          }
          audioSource.src = result.previewUrl;
          audio.controls = true;

          divElement.appendChild(divElement2);
          divElement2.appendChild(img);
          divElement2.appendChild(divElement3);
          divElement3.appendChild(song);
          divElement3.appendChild(audio);
          audio.appendChild(audioSource);

          songContainer.appendChild(divElement);
        })
      })
      .catch(error => console.log('Request failed:', error))
  }
}

document.addEventListener('play', event => {
  const audio = document.getElementsByTagName('audio');
  for (let i = 0; i < audio.length; i++) {
    if (audio[i] != event.target) {
      audio[i].pause();
    }
  }
}, true)
