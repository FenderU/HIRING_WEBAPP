// Llenar select con postulantes disponibles
function cargarCandidatos() {
  const select = document.getElementById("selectCandidato");
  select.innerHTML = "<option value=''>-- Selecciona un postulante --</option>";

  const emailsUnicos = new Set();

  postulantes.forEach(p => {
    if (!emailsUnicos.has(p.email)) {
      emailsUnicos.add(p.email);
      const opt = document.createElement("option");
      opt.value = p.email;
      opt.textContent = `${p.nombre} - ${p.cargo}`;
      select.appendChild(opt);
    }
  });

  select.addEventListener("change", e => {
    mostrarDatosCandidato(e.target.value);
  });
}

// Mostrar datos del postulante seleccionado
function mostrarDatosCandidato(email) {
  const contenedor = document.getElementById("infoCandidato");
  const postulante = postulantes.find(p => p.email === email);

  if (!postulante) {
    contenedor.innerHTML = "<p>No se encontraron datos.</p>";
    return;
  }

  const empresa = buscarEmpresaPorCargo(postulante.cargo);

  contenedor.innerHTML = `
    <p><strong>Nombre:</strong> ${postulante.nombre}</p>
    <p><strong>Profesión:</strong> ${postulante.profesion}</p>
    <p><strong>Universidad:</strong> ${postulante.universidad}</p>
    <p><strong>Estado:</strong> ${postulante.estado}</p>
    <p><strong>Cargo postulado:</strong> ${postulante.cargo}</p>
    <p><strong>Empresa:</strong> ${empresa}</p>
  `;
}

// Función auxiliar para buscar empresa según cargo
function buscarEmpresaPorCargo(cargo) {
  const oferta = ofertas.find(o => o.cargo === cargo);
  return oferta ? oferta.empresa : "Desconocida";
}

// Registrar contrato
document.getElementById("formContratacion").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("selectCandidato").value;
  const postulante = postulantes.find(p => p.email === email);

  if (!postulante) {
    alert("Debe seleccionar un postulante válido.");
    return;
  }

  const contrato = {
    email: postulante.email,
    nombre: postulante.nombre,
    profesion: postulante.profesion,
    universidad: postulante.universidad,
    estado: postulante.estado,
    cargo: postulante.cargo,
    salario: parseFloat(document.getElementById("salarioMensual").value),
    tiempo: document.getElementById("tiempoContrato").value,
    sangre: document.getElementById("sangre").value,
    contactoEmergencia: document.getElementById("contactoEmergencia").value,
    telefono: document.getElementById("telefonoEmergencia").value,
    cuenta: document.getElementById("cuenta").value,
    banco: document.getElementById("banco").value,
    empresa: buscarEmpresaPorCargo(postulante.cargo)
  };

  contratados.push(contrato);
  alert("Postulante contratado exitosamente.");
  e.target.reset();
  document.getElementById("infoCandidato").innerHTML = "";
});

window.addEventListener("DOMContentLoaded", cargarCandidatos);