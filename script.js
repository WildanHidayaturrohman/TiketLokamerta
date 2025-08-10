const audio = document.getElementById("bg-music");

function tryPlayMusic() {
    audio.play().then(() => {
        // Berhasil, hapus listener
        document.removeEventListener("click", tryPlayMusic);
        document.removeEventListener("touchstart", tryPlayMusic);
        document.removeEventListener("keydown", tryPlayMusic);
    }).catch((err) => {
        console.log("Audio masih diblokir, menunggu interaksi pengguna...");
    });
}

// Tambahkan listener untuk interaksi sah
document.addEventListener("click", tryPlayMusic);
document.addEventListener("touchstart", tryPlayMusic);
document.addEventListener("keydown", tryPlayMusic);
