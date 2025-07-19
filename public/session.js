window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!user) {
    alert("Sesión no iniciada. Redirigiendo al login...");
    window.location.href = "index.html";
  } else {
    document.getElementById("nombreUsuario").textContent = user.email;
  }
});

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}