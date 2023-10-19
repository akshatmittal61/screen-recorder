let isRecording = false;
let mediaRecorder;

let btn = document.querySelector(".record-btn");
btn.addEventListener("click", async () => {
	if (isRecording) {
		mediaRecorder.stop();
		btn.innerHTML = `<i class="ri-record-circle-line"></i> Record Your Screen`;
		return;
	}
	let stream = await navigator.mediaDevices.getDisplayMedia({
		video: true,
		audio: true,
	});
	const mime = MediaRecorder.isTypeSupported("video/webm; codecs=h264")
		? "video/webm; codecs=h264"
		: "video/webm";
	mediaRecorder = new MediaRecorder(stream, {
		mimeType: mime,
	});
	let chunks = [];
	mediaRecorder.addEventListener("dataavailable", (e) => {
		chunks.push(e.data);
		console.log(e);
	});
	mediaRecorder.addEventListener("stop", () => {
		isRecording = false;
		mediaRecorder.stream.getTracks().forEach((track) => track.stop());
		let blob = new Blob(chunks, {
			type: chunks[0].type,
		});
		let url = URL.createObjectURL(blob);
		let video = document.querySelector("video");
		video.src = url;
		let a = document.createElement("a");
		a.href = url;
		a.download = `${Date().slice(16, 24)}.mp4`;
		a.click();
	});
	mediaRecorder.start();
	isRecording = true;
	btn.innerHTML = `<i class="ri-stop-line"></i> Stop Recording`;
});

let a = new Date();
if (a.getHours() >= 20 || a.getHours() <= 7) {
	document.querySelector("body").style.backgroundColor = "#050505";
	document.querySelector("footer").style.color = "#f0f0f0";
} else {
	document.querySelector("body").style.backgroundColor = "#f0f0f0";
	document.querySelector("footer").style.color = "#000000";
}
