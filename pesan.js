const form = document.getElementById("form");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const file = formData.get("foto");

  if (!file) {
    hasil.innerHTML = `<p style="color:red;">❌ Silakan upload bukti pembayaran terlebih dahulu.</p>`;
    return;
  }

  const reader = new FileReader();

  reader.onload = async function () {
    const base64 = reader.result.split(",")[1];

    const data = new URLSearchParams({
      nama: formData.get("nama"),
      whatsapp: formData.get("whatsapp"),
      paket: formData.get("paket"),
      tanggal: formData.get("tanggal"),
      foto: base64
    });

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwgJ3C9uSUNOEhUtWzM6ux5A8b6vpRtIjwaOr_s41ZYeLyNW81dvRKnjNnxpnuKkLV-/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
      });

      const kode = await response.text();

      if (kode.includes("Error")) {
        hasil.innerHTML = `<p style="color:red;">❌ Terjadi kesalahan server: ${kode}</p>`;
      } else {
        hasil.innerHTML = `
          <p style="color: green;">✅ Pemesanan berhasil!</p>
          <p><strong>Kode Pemesanan Anda:</strong><br>
          <span style="font-size: 20px; color: #1E90FF;">${kode}</span></p>
        `;
        form.reset();
      }
    } catch (err) {
      hasil.innerHTML = `<p style="color:red;">❌ Gagal mengirim: ${err.message}</p>`;
    }
  };

  reader.readAsDataURL(file);
});





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
