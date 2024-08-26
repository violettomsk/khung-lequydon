document.getElementById('upload').addEventListener('change', handleImage, false);
document.getElementById('download').addEventListener('click', downloadImage, false);

let uploadedFileName = '';

// Vẽ khung nền frame.png ngay khi trang được tải
window.onload = function() {
    initializeSlider()
    drawFrame();
};

function drawFrame() {
    const frame = new Image();
    console.log('drawing... the frame')
    const ctx = canvas.getContext('2d');
    frame.src = 'imgs/frame.png';
    frame.onload = function() {
        canvas.width = frame.width;
        canvas.height = frame.height;

        // Vẽ hình frame lên canvas
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
}

function handleImage(e) {
    uploadedFileName = e.target.files[0].name.split('.')[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const overlay = new Image();
            overlay.src = 'imgs/frame.png';
            overlay.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');

                if (img.width !== img.height) {
                    const minSize= img.width > img.height? img.height : img.width;
                    // crop
                    ctx.drawImage(img, 0, 0, minSize, minSize, 0, 0, minSize, minSize);
                } else {
                    // Calculate the scaling factor to fit the uploaded image within the overlay
                    const scaleFactor = overlay.width / img.width;
                    const scaledWidth = img.width * scaleFactor;
                    const scaledHeight = img.height * scaleFactor;
                    const xOffset = (canvas.width - scaledWidth);
                    const yOffset = (canvas.height - scaledHeight);
                    ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);
                }
                // Draw the overlay on top
                ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
            };
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = `LQD-${uploadedFileName}.jpg`;
    link.click();
}

function initializeSlider() {
    const slider = document.getElementById('image-slider');

    // Danh sách tên file ảnh trong thư mục sliders (bạn sẽ phải tự động tạo danh sách này, hoặc sử dụng một script server-side để tạo nó)
    const images = [
        'sliders/1.jpg',
        'sliders/2.jpg',
        'sliders/3.jpg',
        'sliders/4.jpg',
        'sliders/5.jpg',
        'sliders/6.jpg',
        'sliders/7.jpg',
        'sliders/8.jpg',
        'sliders/9.jpg',
        'sliders/10.jpg'
    ];

    images.forEach(image => {
        const slide = document.createElement('div');
        slide.innerHTML = `<img src="${image}" alt="Slide Image">`;
        slider.appendChild(slide);
    });

    // Khởi tạo slider với Slick
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
}
