let btn = document.querySelector(".record-btn");
btn.addEventListener("click", async () => {
	let stream = await navigator.mediaDevices.getDisplayMedia({
		video: true,
	});
	const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
		? "video/webm; codecs=vp9"
		: "video/webm";
	let mediaRecorder = new MediaRecorder(stream, {
		mimeType: mime,
	});
	let chunks = [];
	mediaRecorder.addEventListener("dataavailable", (e) => {
		chunks.push(e.data);
	});
	mediaRecorder.addEventListener("stop", () => {
		let blob = new Blob(chunks, {
			type: chunks[0].type,
		});
		let url = URL.createObjectURL(blob);
		let video = document.querySelector("video");
		video.src = url;
		let a = document.createElement("a");
		a.href = url;
		a.download = `${Date().slice(16, 24)}.webm`;
		a.click();
	});
	mediaRecorder.start();
});

let a = new Date();
if (a.getHours() >= 20 || a.getHours() <= 7) {
	document.querySelector("body").style.backgroundColor = "#050505";
	document.querySelector("footer").style.color = "#f0f0f0";
} else {
	document.querySelector("body").style.backgroundColor = "#f0f0f0";
	document.querySelector("footer").style.color = "#000000";
}
