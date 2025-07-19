document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const user = usuarios.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
    
    switch (user.rol) {
      case "Administrador":
        window.location.href = "/admin";
        break;
      case "HiringGroup":
        //window.location.href = "grupo.ejs";
        window.location.href = "/grupo"
        break;
      case "Empresa":
        window.location.href = "/empresa";
        break;
      case "Postulante":
        window.location.href = "/postulante";
        break;
      case "Contratado":
        window.location.href = "/contratado";
        break;
    }
  } else {
    message.textContent = "Credenciales incorrectas.";
    message.style.color = "red";
  }
});