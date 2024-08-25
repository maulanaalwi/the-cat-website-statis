document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.getElementById('profile-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuButton.querySelector('svg:first-of-type');
    const closeIcon = mobileMenuButton.querySelector('svg:last-of-type');

    profileButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
        if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        mobileMenuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
});

// animasi
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);

window.addEventListener('load', handleScroll);

// image galery
let uploadedImages = [];

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            uploadedImages.push(imageUrl); // Menambahkan URL gambar ke array uploadedImages
        };
        reader.readAsDataURL(file);
    }
}

function uploadImage() {
    const imageGrid = document.getElementById('imageGrid');

    // Tambahkan gambar baru ke grid
    uploadedImages.forEach((imageUrl, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = "w-full h-64 bg-gray-300 overflow-hidden rounded-lg";

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `Image ${imageGrid.children.length + 1}`;
        imageElement.className = "w-full h-full object-cover hover:scale-105 transition-transform duration-300";

        imageContainer.appendChild(imageElement);
        imageGrid.appendChild(imageContainer);
    });

    // Bersihkan array uploadedImages setelah menampilkan gambar
    uploadedImages = [];
}

