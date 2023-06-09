const { contextBridge, ipcRenderer } = require("electron");

const dataVersion = localStorage.getItem("version");
const dataNickname = localStorage.getItem("nickname");

contextBridge.exposeInMainWorld("versions", {
	launch: (version, nickname) => {
		ipcRenderer.invoke("launch", JSON.parse(JSON.stringify(version)), nickname);
	},
});

window.addEventListener("DOMContentLoaded", () => {
	fetch(
		"https://raw.githubusercontent.com/hugmanrique/mc-versions/main/versions.json"
	)
		.then((response) => response.json())
		.then((data) => {
			const select = document.querySelector(".select_version");
			data.editions.java.versions.forEach((element) => {
				const option = document.createElement("option");
				option.value = element.name;
				option.textContent = element.name;
				select.append(option);
			});
		});
});
