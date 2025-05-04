const header = document.getElementById("header");

const nav = document.createElement("nav")
nav.innerHTML = `
            <h2>El universo musical</h2>
            <div id="enlancesNav">
                <a href="busqueda.html"><i class="fas fa-search"></i></a>
                <a href="index.html">Home</a>
                <a href="log_in.html">Log in</a>
                <a href="sobreNosotros.html">About us</a>
                <a href="soporte.html">Soporte</a>
                <a href="perfil_usuario.html"><i class="fas fa-user"></i></a>
            </div>
        `;
header.appendChild(nav);