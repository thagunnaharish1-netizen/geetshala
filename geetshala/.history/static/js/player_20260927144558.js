// document.addEventListener("DOMContentLoaded", () => {
//     const playBtn = document.getElementById("global-play-btn");
//     const audioEngine = document.getElementById("main-audio-engine");
//     const currentTitle = document.getElementById("current-title");
//     const currentArtist = document.getElementById("current-artist");
//     const artPlaceholder = document.getElementById("player-art-placeholder");
//     const searchInput = document.getElementById("sidebar-search-input");

//     playBtn.addEventListener("click", () => {
//         if (!audioEngine.src || audioEngine.src === window.location.href) return;
        
//         if (audioEngine.paused) {
//             audioEngine.play();
//             playBtn.querySelector("i").className = "fa-solid fa-circle-pause";
//         } else {
//             audioEngine.pause();
//             playBtn.querySelector("i").className = "fa-solid fa-circle-play";
//         }
//     });

//     window.playTrack = function(title, artist, streamUrl, coverUrl) {
//         currentTitle.textContent = title;
//         currentArtist.textContent = artist;
        
//         if (coverUrl) {
//             artPlaceholder.innerHTML = `<img src="${coverUrl}" style="width:100%; height:100%; object-fit:cover;">`;
//         } else {
//             artPlaceholder.innerHTML = `<i class="fa-solid fa-music" style="color: var(--text-muted);></i>`;
//         }

//         if (streamUrl) {
//             audioEngine.src = streamUrl;
//             audioEngine.play();
//             playBtn.querySelector("i").className = "fa-solid fa-circle-pause";
//         } else {
//             alert("No audio file found for this track in the admin database dashboard repository.");
//         }
//     };

//     if (searchInput) {
//         searchInput.addEventListener("input", (e) => {
//             const query = e.target.value.toLowerCase().trim();
            
//             document.querySelectorAll(".song-card").forEach(card => {
//                 const title = card.getAttribute("data-title").toLowerCase();
//                 const artist = card.getAttribute("data-artist").toLowerCase();
//                 card.style.display = (title.includes(query) || artist.includes(query)) ? "block" : "none";
//             });

//             document.querySelectorAll(".track-row").forEach(row => {
//                 const title = row.getAttribute("data-title").toLowerCase();
//                 const artist = row.getAttribute("data-artist").toLowerCase();
//                 row.style.display = (title.includes(query) || artist.includes(query)) ? "grid" : "none";
//             });
//         });
//     }
// });




// State management for the music player
const playerState = {
    isPlaying: false,
    currentTrack: null
};

// DOM Elements
const audioEngine = document.getElementById('main-audio-engine');
const globalPlayBtn = document.getElementById('global-play-btn');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const playerArtPlaceholder = document.getElementById('player-art-placeholder');
const sidebarSearchInput = document.getElementById('sidebar-search-input');

/**
 * Main function triggered when clicking a song card or row
 * @param {string} title - Track title
 * @param {string} artist - Track artist name
 * @param {string} audioUrl - Path to the audio file
 * @param {string} coverUrl - Path to the cover image file
 */
function playTrack(title, artist, audioUrl, coverUrl) {
    // If no specific audio URL is available, provide a fallback or log a warning
    if (!audioUrl) {
        console.warn('No audio file provided for this mock track. Playing fallback audio snippet.');
        // Optional fallback for demo purposes: 
        // audioUrl = 'https://soundhelix.com';
    }

    playerState.currentTrack = { title, artist, audioUrl, coverUrl };
    
    // Update the visual metadata in the player bar
    currentTitle.textContent = title;
    currentArtist.textContent = artist || 'Unknown Artist';
    
    // Update cover art thumbnail
    if (coverUrl) {
        playerArtPlaceholder.innerHTML = `<img src="${coverUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">`;
    } else {
        playerArtPlaceholder.innerHTML = `<i class="fa-solid fa-music" style="color: var(--text-muted);"></i>`;
    }

    // Load track source into the HTML5 audio element
    audioEngine.src = audioUrl || '';
    
    if (audioUrl) {
        audioEngine.play()
            .then(() => {
                setPlayState(true);
            })
            .catch(error => {
                console.error("Playback failed or was blocked by browser auto-play policies:", error);
                setPlayState(false);
            });
    } else {
        setPlayState(false);
    }
}

/**
 * Updates UI play/pause icons globally and synced with state
 * @param {boolean} shouldPlay 
 */
function setPlayState(shouldPlay) {
    playerState.isPlaying = shouldPlay;
    const playIcon = globalPlayBtn.querySelector('i');
    
    if (shouldPlay) {
        playIcon.className = 'fa-solid fa-circle-pause';
    } else {
        playIcon.className = 'fa-solid fa-circle-play';
    }
}

/**
 * Alternates between playing and pausing the currently loaded track
 */
function togglePlayPause() {
    if (!playerState.currentTrack) return;

    if (playerState.isPlaying) {
        audioEngine.pause();
        setPlayState(false);
    } else {
        if (audioEngine.src) {
            audioEngine.play()
                .then(() => setPlayState(true))
                .catch(err => console.error(err));
        }
    }
}

// Event Listener for the sticky footer Play/Pause button
globalPlayBtn.addEventListener('click', togglePlayPause);

// Synchronize state if the user interacts with system hardware keys or audio finishes
audioEngine.addEventListener('play', () => setPlayState(true));
audioEngine.addEventListener('pause', () => setPlayState(false));
audioEngine.addEventListener('ended', () => setPlayState(false));

// Optional Client-side Sidebar Search logic to filter visible track elements
if (sidebarSearchInput) {
    sidebarSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Filter elements in the Recommended Mix card grid
        document.querySelectorAll('.song-card').forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const artist = (card.getAttribute('data-artist') || '').toLowerCase();
            if (title.includes(query) || artist.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Filter elements in the All Tracks list table rows
        document.querySelectorAll('.track-row').forEach(row => {
            const title = (row.getAttribute('data-title') || '').toLowerCase();
            const artist = (row.getAttribute('data-artist') || '').toLowerCase();
            if (title.includes(query) || artist.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}
