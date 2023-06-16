var dropzone = document.getElementById('dropzone');
var fileInput = document.getElementById('file-input');
var popup = document.getElementById('popup');
var nameInput = document.getElementById('name-input');
var saveButton = document.getElementById('save-button');
var deleteButton = document.getElementsByClassName("delete")[0];

function checkLocalStorage() {
    var imageList = [];
    var nameList = [];

    for (var key in localStorage) {
        if (key.startsWith("image_")) {
            imageList.push(localStorage.getItem(key));
        }
        if (key.startsWith("name_")) {
            nameList.push(localStorage.getItem(key));
        }
    }

    if (imageList.length > 0 && nameList.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageList.length);
        const image = localStorage.getItem(`image_${randomIndex}`);
        const name = localStorage.getItem(`name_${randomIndex}`);
        console.log(randomIndex);
        console.log(localStorage.getItem(`name_${randomIndex}`))
        dropzone.innerHTML = '';

        var img = document.createElement('img');
        img.src = image;
        img.alt = 'uploaded image';

        var span = document.createElement('span');
        span.className = 'name';
        span.textContent = name;

        dropzone.appendChild(img);
        dropzone.appendChild(span);
    }
}

checkLocalStorage();

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
});

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = e.target.result;
        showPopup();

        saveButton.addEventListener('click', () => {
            const nameInputValue = nameInput.value;
            const nameRegex = /^[A-Za-z]+$/;

            if (nameInputValue && nameRegex.test(nameInputValue)) {
                const imageCount = localStorage.getItem('imageCount') || 0;
                const imageKey = `image_${imageCount}`;
                const nameKey = `name_${imageCount}`;

                dropzone.innerHTML = '';

                var img = document.createElement('img');
                img.src = image;
                img.alt = 'uploaded image';

                var span = document.createElement('span');
                span.className = 'name';
                span.textContent = nameInputValue;

                dropzone.appendChild(img);
                dropzone.appendChild(span);

                localStorage.setItem(imageKey, image);
                localStorage.setItem(nameKey, nameInputValue);
                localStorage.setItem('imageCount', parseInt(imageCount) + 1);

                hidePopup();
            } else {
                alert('Numele introdus nu este valid. Introduceti doar litere.');
            }
        });
    }

    reader.readAsDataURL(file);
});

function showPopup() {
    nameInput.value = "";
    popup.style.display = 'block';
}

function hidePopup() {
    popup.style.display = 'none';
}

function clearLocalStorage() {
    localStorage.removeItem('image');
    localStorage.clear();
}

deleteButton.addEventListener('click', function () {
    clearLocalStorage();
    dropzone.innerHTML = `<span class="message">Galeria dvs a fost stearsa!</span>`;
});
