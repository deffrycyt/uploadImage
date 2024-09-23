document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Silakan pilih file gambar terlebih dahulu!');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('https://upload-image-zeta.vercel.app/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').innerHTML = `<p>Gambar berhasil diupload! Link: <a href="${data.link}" target="_blank">${data.link}</a></p>`;
        } else {
            throw new Error('Gagal mengupload gambar');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Menampilkan contoh fungsi API
const apiExample = `
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('https://upload-image-zeta.vercel.app/upload', {
        method: 'POST',
        body: formData,
    });
    
    if (response.ok) {
        const data = await response.json();
        return data.link; // Kembalikan link gambar
    } else {
        throw new Error('Upload gagal');
    }
}
`;
document.getElementById('apiExample').textContent = apiExample;
