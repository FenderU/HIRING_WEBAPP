window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  document.getElementById("nombreUsuario").textContent = user.email;

  mostrarOfertas();
});

async function mostrarOfertas() {
  const lista = document.getElementById("listaOfertas");
  lista.innerHTML = "";

  ofertas.filter(o => o.activa).forEach(of => {
    const li = document.createElement("li");
    li.textContent = `${of.cargo} - ${of.descripcion} - $${of.salario}`;
    lista.appendChild(li);
  });
}

// Buscar recibos simulados
document.getElementById("filtroRecibo").addEventListener("submit", e => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  const mes = document.getElementById("mesRecibo").value;

  const recibido = contratados.find(c => c.email === user.email);

  if (!recibido) {
    document.getElementById("resultadoRecibo").textContent = "No se encontraron pagos.";
    return;
  }

  // Simulando que cobra todos los meses iguales
  const inces = recibido.salario * 0.005;
  const ivss = recibido.salario * 0.01;
  const comision = recibido.salario * 0.02;
  const neto = recibido.salario - inces - ivss - comision;

  const texto = `
  Recibo de Pago
  Mes: ${mes}
  Nombre: ${recibido.nombre}
  Cargo: ${recibido.cargo}
  Salario Base: $${recibido.salario.toFixed(2)}
  Descuentos:
    - INCES (0.5%): -$${inces.toFixed(2)}
    - IVSS (1%): -$${ivss.toFixed(2)}
    - Comisión Hiring (2%): -$${comision.toFixed(2)}
  --------------------------------------
  Neto a Pagar: $${neto.toFixed(2)}
  `;

  document.getElementById("resultadoRecibo").textContent = texto;
});

function generarConstancia() {
  //const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  //const contrato = contratados.find(c => c.email === user.email);

  //if (!contrato) {
    //document.getElementById("constanciaTexto").textContent = "No se encontró información de contratación.";
    //return;
  //}

  //const fecha = new Date().toLocaleDateString("es-VE");

  //const texto = `
//A QUIEN PUEDA INTERESAR

//Por medio de la presente la empresa HIRING GROUP hace constar que el ciudadano(a)
//${contrato.nombre}, labora con nosotros desde ${contrato.tiempo}, cumpliendo
//funciones en el cargo de ${contrato.cargo} en la empresa asignada, teniendo un
//salario mensual de $${contrato.salario.toFixed(2)}.

//Constancia que se pide por la parte interesada en la ciudad de Puerto Ordaz en fecha
//${fecha}.`
//  ;

//  document.getElementById("constanciaTexto").textContent = texto;
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
    window.history.back();
}
