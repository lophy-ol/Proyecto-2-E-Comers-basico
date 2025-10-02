document.addEventListener("DOMContentLoaded", () => {
  
  //Mensaje dinámico "¡¡Bienvenido!!"
  
  const mensajeElemento = document.getElementById("mensaje");
  if (mensajeElemento) {
    const mensaje = "¡¡Bienvenido!!";
    let i = 0;
    function escribirMensaje() {
      if (i < mensaje.length) {
        mensajeElemento.textContent += mensaje.charAt(i);
        i++;
        setTimeout(escribirMensaje, 120);
      }
    }
    escribirMensaje();
  }

  
  //Validación de formulario y checkbox
  
  const form = document.getElementById("formRegistro");
  const btnRegistrar = document.getElementById("btnRegistrar");
  const checkTerminos = document.getElementById("terminos");

  if (form && btnRegistrar && checkTerminos) {
    checkTerminos.addEventListener("change", () => {
      btnRegistrar.disabled = !checkTerminos.checked;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll("input[required]");
      let valido = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valido = false;
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!valido) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      if (!checkTerminos.checked) {
        alert("Debes aceptar los términos y condiciones.");
        return;
      }

      alert("Registro exitoso ✅");
      form.submit();
    });
  }

  //Botón "Ver más" para información adicional

  const btnVerMas = document.getElementById("btnVerMas");
  const infoAdicional = document.getElementById("infoAdicional");

  if (btnVerMas && infoAdicional) {
    infoAdicional.style.display = "none";

    btnVerMas.addEventListener("click", () => {
      if (infoAdicional.style.display === "none" || infoAdicional.style.display === "") {
        infoAdicional.style.display = "block";
        btnVerMas.textContent = "Ver menos";
      } else {
        infoAdicional.style.display = "none";
        btnVerMas.textContent = "Ver más";
      }
    });
  }

  
  //Función "Agregar al carrito"
  
  const contadorElemento = document.getElementById("contador");
  const botonesCarrito = document.querySelectorAll(".btn");
  let contador = 0;

  if (contadorElemento && botonesCarrito.length > 0) {
    botonesCarrito.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        e.preventDefault();
        contador++;
        contadorElemento.textContent = contador;
      });
    });
  }

  
  //Carrito con productos ficticios 
  
  const carritoBody = document.getElementById("carrito-body");
  const totalElemento = document.getElementById("total");

  if (carritoBody && totalElemento) {
    const productos = [
      { id: 1, nombre: "Pan Bimbo Blanco", precio: 50.00, cantidad: 2, imagen: "img/PAN_BIMBO_BLANCO_GRANDE.png" },
      { id: 2, nombre: "Leche Lala 1L", precio: 29.00, cantidad: 3, imagen: "img/leche_lala.jpg" },
      { id: 3, nombre: "Coca Cola 2.5L", precio: 47.00, cantidad: 3, imagen: "img/Coca_2L.png" }
    ];

    function renderizarCarrito() {
      carritoBody.innerHTML = "";

      productos.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;

        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
          <td>${producto.nombre}</td>
          <td>$${producto.precio.toFixed(2)}</td>
          <td><input type="number" value="${producto.cantidad}" min="1" data-index="${index}" class="input-cantidad"></td>
          <td class="subtotal">$${subtotal.toFixed(2)}</td>
          <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
        `;
        carritoBody.appendChild(fila);
      });

      recalcularTotal();
      activarEventos();
    }

    function recalcularTotal() {
      let total = 0;
      document.querySelectorAll(".subtotal").forEach((celda) => {
        total += parseFloat(celda.textContent.replace("$", ""));
      });
      totalElemento.textContent = total.toFixed(2);
    }

    function activarEventos() {
      document.querySelectorAll(".input-cantidad").forEach((input) => {
        input.addEventListener("change", (e) => {
          const index = e.target.getAttribute("data-index");
          let nuevaCantidad = parseInt(e.target.value);
          if (nuevaCantidad < 1) nuevaCantidad = 1;
          productos[index].cantidad = nuevaCantidad;
          renderizarCarrito();
        });
      });

      document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          productos.splice(index, 1);
          renderizarCarrito();
        });
      });
    }

    renderizarCarrito();
  }

  
  //Funcionalidad de búsqueda ficticia
  
  const formBusqueda = document.getElementById("formBusqueda");
  const inputBusqueda = document.getElementById("inputBusqueda");
  const resultados = document.getElementById("resultados");

  if (formBusqueda && inputBusqueda && resultados) {
    const productosFicticios = [
      { nombre: "Pan Bimbo Blanco", precio: "$50.00", imagen: "https://via.placeholder.com/50" },
      { nombre: "Leche Lala 1L Negros", precio: "$29.00", imagen: "https://via.placeholder.com/50" },
      { nombre: "Coca Cola 2.5L", precio: "$47.00", imagen: "https://via.placeholder.com/50" },
      { nombre: "Gema bestial", precio: "$50000.00", imagen: "https://via.placeholder.com/50" }
    ];

    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault();
      const termino = inputBusqueda.value.trim();
      if (termino === "") {
        resultados.innerHTML = "<p>Por favor, ingresa un término de búsqueda.</p>";
        return;
      }

      resultados.innerHTML = `<h3>Resultados para la búsqueda de "${termino}"</h3>`;

      productosFicticios.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div>
            <p><strong>${producto.nombre}</strong></p>
            <p>Precio: ${producto.precio}</p>
          </div>
        `;
        resultados.appendChild(div);
      });
    });
  }


});
