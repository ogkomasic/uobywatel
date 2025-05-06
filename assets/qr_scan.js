<script>
    const video = document.getElementById('camera');

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment" // używa tylnej kamery na telefonie
                },
                audio: false
            });
            video.srcObject = stream;
        } catch (err) {
            alert("Nie udało się uzyskać dostępu do kamery: " + err);
        }
    }

    // Uruchom kamerę po załadowaniu strony
    window.addEventListener("load", startCamera);
</script>
