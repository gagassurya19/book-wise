// File: assets/js/scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const userTable = document.getElementById('userTable');
    const loading = document.getElementById('loading');

    // Fungsi untuk fetch data dari API
    function fetchUserData() {
        // Menampilkan spinner loading
        loading.classList.remove('hidden');

        // Fetch data dari API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                loading.classList.add('hidden'); // Sembunyikan spinner

                // Looping data dan menambahkan ke tabel
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="border px-4 py-2">${user.id}</td>
                        <td class="border px-4 py-2">${user.name}</td>
                        <td class="border px-4 py-2">${user.email}</td>
                    `;
                    userTable.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loading.innerHTML = '<p>Error loading data. Please try again.</p>';
            });
    }

    // Panggil fungsi fetch data saat halaman di-load
    fetchUserData();
});

