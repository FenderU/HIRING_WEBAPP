document.getElementById("formEmpresa").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("empresaNombre").value;
  const sector = document.getElementById("empresaSector").value;
  const contacto = document.getElementById("empresaContacto").value;
  const email = document.getElementById("empresaEmail").value;
  const password = document.getElementById("empresaPassword").value;

  empresas.push({ nombre, sector, contacto, email, password });
  mostrarEmpresas();
  e.target.reset();
});

function mostrarEmpresas() {
  const lista = document.getElementById("listaEmpresas");
  lista.innerHTML = "";
  empresas.forEach((emp, i) => {
    const li = document.createElement("li");
    li.textContent = `${emp.nombre} - ${emp.sector} - ${emp.contacto}`;
    const del = document.createElement("button");
    del.textContent = "Eliminar";
    del.onclick = () => {
      empresas.splice(i, 1);
      mostrarEmpresas();
    };
    li.appendChild(del);
    lista.appendChild(li);
  });

  // actualizar empresas en selección de nómina
  const select = document.getElementById("empresaNomina");
  select.innerHTML = "";
  empresas.forEach(emp => {
    const opt = document.createElement("option");
    opt.value = emp.nombre;
    opt.textContent = emp.nombre;
    select.appendChild(opt);
  });
}

window.addEventListener("DOMContentLoaded", mostrarEmpresas);