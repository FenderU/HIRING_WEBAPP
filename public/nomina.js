document.getElementById("formNomina").addEventListener("submit", e => {
  e.preventDefault();
  const empresa = document.getElementById("empresaNomina").value;
  const mes = document.getElementById("mesNomina").value;

  const empleados = contratados.filter(c => c.empresa === empresa || true); // por ahora todos
  let texto = `Nómina - ${empresa} (${mes})\n\n`;

  empleados.forEach(emp => {
    texto += `Empleado: ${emp.nombre}, Salario: $${emp.salario.toFixed(2)}\n`;
  });

  document.getElementById("reporteNomina").textContent = texto;
});

function correrNomina() {
  let texto = `Corrida de Nómina:\n\n`;
  contratados.forEach(emp => {
    const salarioBase = emp.salario;
    const inces = salarioBase * 0.005;
    const ivss = salarioBase * 0.01;
    const comision = salarioBase * 0.02;
    const salarioFinal = salarioBase - inces - ivss - comision;

    texto += `Empleado: ${emp.nombre}\n`;
    texto += `Salario Base: $${salarioBase.toFixed(2)}\n`;
    texto += `INCES: -$${inces.toFixed(2)} | IVSS: -$${ivss.toFixed(2)} | Comisión: -$${comision.toFixed(2)}\n`;
    texto += `Neto a Pagar: $${salarioFinal.toFixed(2)}\n\n`;
  });

  document.getElementById("reporteCorrida").textContent = texto;
}

window.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaBancos");
  bancos.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    lista.appendChild(li);
  });
});