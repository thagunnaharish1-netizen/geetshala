document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("global-play-btn");
    const audioEngine = document.getElementById("main-audio-engine");
    const currentTitle = document.getElementById("current-title");
    const currentArtist = document.getElementById("current-artist");
    const artPlaceholder = document.getElementById("player-art-placeholder");
    const searchInput = document.getElementById("sidebar-search-input");

    playBtn.addEventListener("click", () => {
        if (!audioEngine.src || audioEngine.src === window.location.href) return;
        
        if (audioEngine.paused) {
            audioEngine.play();
            playBtn.querySelector("i").className = "fa-solid fa-circle-pause";
        } else {
            audioEngine.pause();
            playBtn.querySelector("i").className = "fa-solid fa-circle-play";
        }
    });

    window.playTrack = function(title, artist, streamUrl, coverUrl) {
        currentTitle.textContent = title;
        currentArtist.textContent = artist;
        
        if (coverUrl) {
            artPlaceholder.innerHTML = `<img src="${coverUrl}" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            artPlaceholder.innerHTML = `<i class="fa-solid fa-music" style="color: var(--text-muted);></i>`;
        }

        if (streamUrl) {
            audioEngine.src = streamUrl;
            audioEngine.play();
            playBtn.querySelector("i").className = "fa-solid fa-circle-pause";
        } else {
            alert("No audio file found for this track in the admin database dashboard repository.");
        }
    };

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            document.querySelectorAll(".song-card").forEach(card => {
                const title = card.getAttribute("data-title").toLowerCase();
                const artist = card.getAttribute("data-artist").toLowerCase();
                card.style.display = (title.includes(query) || artist.includes(query)) ? "block" : "none";
            });

            document.querySelectorAll(".track-row").forEach(row => {
                const title = row.getAttribute("data-title").toLowerCase();
                const artist = row.getAttribute("data-artist").toLowerCase();
                row.style.display = (title.includes(query) || artist.includes(query)) ? "grid" : "none";
            });
        });
    }
});