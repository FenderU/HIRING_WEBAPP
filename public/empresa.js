let ofertaEditando = null;

window.addEventListener("DOMContentLoaded", () => {
  mostrarOfertas();
});

document.getElementById("formOferta").addEventListener("submit", e => {
  e.preventDefault();

  const nueva = {
    id: ofertaEditando ? ofertaEditando.id : Date.now(),
    cargo: document.getElementById("cargo").value,
    descripcion: document.getElementById("descripcion").value,
    salario: parseFloat(document.getElementById("salario").value),
    area: document.getElementById("area").value,
    estado: document.getElementById("estado").value,
    activa: ofertaEditando ? ofertaEditando.activa : true,
    empresa: document.getElementById("empresa").value
  };

  if (ofertaEditando) {
    const i = ofertas.findIndex(o => o.id === ofertaEditando.id);
    if (i !== -1) ofertas[i] = nueva;
    ofertaEditando = null;
  } else {
    ofertas.push(nueva);
  }

  e.target.reset();
  mostrarOfertas();
});

function mostrarOfertas() {
  const lista = document.getElementById("listaOfertas");
  lista.innerHTML = "";

  ofertas.forEach(of => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${of.cargo}</strong> - ${of.area} - ${of.estado} - $${of.salario}<br>
      ${of.descripcion}<br>
      Empresa: ${of.empresa}<br>
      Estado: <span style="color:${of.activa ? 'green' : 'red'}">${of.activa ? 'Activa' : 'Inactiva'}</span><br>
    `;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = " Editar";
    btnEditar.onclick = () => cargarOferta(of);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = " Eliminar";
    btnEliminar.onclick = () => {
      const i = ofertas.findIndex(o => o.id === of.id);
      if (i !== -1) {
        ofertas.splice(i, 1);
        mostrarOfertas();
      }
    };

    const btnToggle = document.createElement("button");
    btnToggle.textContent = of.activa ? "Desactivar" : "Activar";
    btnToggle.onclick = () => {
      of.activa = !of.activa;
      mostrarOfertas();
    };

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    li.appendChild(btnToggle);

    lista.appendChild(li);
  });
}

function cargarOferta(of) {
  ofertaEditando = of;
  document.getElementById("cargo").value = of.cargo;
  document.getElementById("descripcion").value = of.descripcion;
  document.getElementById("salario").value = of.salario;
  document.getElementById("area").value = of.area;
  document.getElementById("estado").value = of.estado;
  document.getElementById("empresa").value = of.empresa;
}

// Cambiar contraseña (simulado)
document.getElementById("formPassword").addEventListener("submit", e => {
  e.preventDefault();
  const nuevaClave = document.getElementById("nuevaClave").value;

  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  const empresa = empresas.find(e => e.email === user.email);

  if (empresa) {
    empresa.password = nuevaClave;
    alert("Contraseña actualizada correctamente (simulada).");
  } else {
    alert("No se encontró la empresa actual.");
  }

  e.target.reset();
});