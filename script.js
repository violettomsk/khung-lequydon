document.getElementById('upload').addEventListener('change', handleImage, false);
document.getElementById('download').addEventListener('click', downloadImage, false);

let uploadedFileName = '';

window.onload = function() {
    drawFrame();
};

function drawFrame() {
    const frame = new Image();
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

                // Set canvas dimensions to match the overlay
                canvas.width = overlay.width;
                canvas.height = overlay.height;

                // Calculate the scaling factor to fit the uploaded image within the overlay
                const scaleFactor = Math.min(
                    overlay.width / img.width,
                    overlay.height / img.height
                );

                const scaledWidth = img.width * scaleFactor;
                const scaledHeight = img.height * scaleFactor;

                // Center the scaled image on the canvas
                const xOffset = (canvas.width - scaledWidth);
                const yOffset = (canvas.height - scaledHeight);

                // Draw the scaled image
                ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);

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
