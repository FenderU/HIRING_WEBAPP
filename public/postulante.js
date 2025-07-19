let perfil = {};
let experiencias = [];

document.getElementById("perfilForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = JSON.parse(localStorage.getItem("usuarioActivo")).email;

  perfil = {
    nombre: document.getElementById("nombre").value,
    profesion: document.getElementById("profesion").value,
    universidad: document.getElementById("universidad").value,
    estado: document.getElementById("estado").value,
    email: email,
    cargo: "Sin asignar" // inicializado como no postulado
  };

  // Guardar el postulante
  const existente = postulantes.find(p => p.email === email);
  if (!existente) {
    postulantes.push(perfil);
    alert("Perfil guardado exitosamente.");
  } else {
    // Actualizar datos si ya existe
    Object.assign(existente, perfil);
    alert("Perfil actualizado.");
  }
});

document.getElementById("experienciaForm").addEventListener("submit", e => {
  e.preventDefault();

  const exp = {
    empresa: document.getElementById("empresa").value,
    cargo: document.getElementById("cargo").value,
    inicio: document.getElementById("inicio").value,
    fin: document.getElementById("fin").value
  };

  experiencias.push(exp);
  mostrarExperiencia();
  e.target.reset();
});

function mostrarExperiencia() {
  const lista = document.getElementById("listaExperiencia");
  lista.innerHTML = "";

  experiencias.forEach((exp, i) => {
    const li = document.createElement("li");
    li.textContent = `${exp.empresa} - ${exp.cargo} (${exp.inicio} a ${exp.fin})`;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => {
      experiencias.splice(i, 1);
      mostrarExperiencia();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Cargar áreas desde ofertas simuladas
window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("areaFiltro");
  const areas = [...new Set(ofertas.map(o => o.area))];

  areas.forEach(area => {
    const opt = document.createElement("option");
    opt.value = area;
    opt.textContent = area;
    select.appendChild(opt);
  });

  mostrarPostulaciones();
});

// Filtrar y postularse a ofertas
function filtrarOfertas() {
  const area = document.getElementById("areaFiltro").value;
  const estado = document.getElementById("estadoFiltro").value.toLowerCase();

  const filtradas = ofertas.filter(o =>
    o.area === area &&
    o.estado.toLowerCase().includes(estado) &&
    o.activa
  );

  const lista = document.getElementById("ofertasFiltradas");
  lista.innerHTML = "";

  filtradas.forEach(of => {
    const li = document.createElement("li");
    li.textContent = `${of.cargo} - ${of.descripcion} - $${of.salario}`;

    const btn = document.createElement("button");
    btn.textContent = "Postularme";
    btn.onclick = () => postularse(of);

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function postularse(oferta) {
  const email = JSON.parse(localStorage.getItem("usuarioActivo")).email;
  const postulante = postulantes.find(p => p.email === email);

  if (!postulante) {
    alert("Debes registrar tu perfil antes de postularte.");
    return;
  }

  if (postulante.cargo !== "Sin asignar") {
    alert("Ya te has postulado a una oferta.");
    return;
  }

  postulante.cargo = oferta.cargo;
  postulante.area = oferta.area;
  postulante.fechaPostulacion = new Date().toISOString().split("T")[0];

  alert("Postulado con éxito.");
  mostrarPostulaciones();
}

function mostrarPostulaciones() {
  const lista = document.getElementById("misPostulaciones");
  lista.innerHTML = "";

  const email = JSON.parse(localStorage.getItem("usuarioActivo")).email;
  const postulante = postulantes.find(p => p.email === email);

  if (postulante && postulante.cargo !== "Sin asignar") {
    const li = document.createElement("li");
    li.textContent = `${postulante.fechaPostulacion}: ${postulante.cargo}`;
    lista.appendChild(li);
  }
}