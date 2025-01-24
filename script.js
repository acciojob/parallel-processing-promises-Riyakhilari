const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}


btn.addEventListener("click", () => {
  
  output.innerHTML = "";
  errorDiv.textContent = "";

  loading.style.display = "block";

  
  Promise.all(images.map(loadImage))
    .then((imageElements) => {
      // Hide loading spinner
      loading.style.display = "none";

      
      imageElements.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      
      loading.style.display = "none";

      errorDiv.textContent = err.message;
    });
});
