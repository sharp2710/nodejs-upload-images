const input = document.querySelector("#input-multi-files");
const preview = document.querySelector(".preview-images");
const upload = document.querySelector("#upload");
const path = document.querySelector("#path");
const label = document.querySelector("#label-upload");

label.addEventListener("click", function () {
  preview.innerHTML = "";
  input.value = "";

});

input.addEventListener("change", function () {
  const files = Array.from(input.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const image = document.createElement("img");
      image.src = reader.result;
      preview.appendChild(image);
    });
    reader.readAsDataURL(file);
  });
});

upload.addEventListener("click", function () {
  if (path.value == "") {
swal({
  title: "Error",
  text: "Please enter a path",
  icon: "error",
  button: "OK",

})
  } else {
    const formData = new FormData();
    const files = Array.from(input.files);
    formData.append("path", path.value);
    files.forEach((file) => {
      formData.append("multi-files", file);
    });
    fetch("/multiple-upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Success") {
          swal({
            title: "Success",
            text: "Upload Success",
            icon: "success",
            button: "OK",
          }).then(() => {
            path.value = "";
            preview.innerHTML = "";
            input.value = "";
          });
        } else {
          swal({
            title: "Error",
            text: data,
            icon: "error",
            button: "Ok",
          }).then(() => {
            path.value = "";
            preview.innerHTML = "";
            input.value = "";
          });
        }
      });
  }
});