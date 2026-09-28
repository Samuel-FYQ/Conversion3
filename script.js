/* ============================================================
   ESCAPE ROOM FYQ – CAMBIO DE UNIDADES 3.º ESO
   Autor: Samuel López Melián
   ============================================================ */

/* -------------------------
   VARIABLES GLOBALES
------------------------- */

let alumno = "";
let curso = "";

let codigos = [];
const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ";

let candado = Array(10).fill(" _ ");
let retoActual = 0;

/* -------------------------
   GENERAR CÓDIGOS ALEATORIOS
------------------------- */

function generarDigito() {
    return Math.random() < 0.5
        ? letras[Math.floor(Math.random() * letras.length)]
        : Math.floor(Math.random() * 10).toString();
}

function generarCodigos() {
    codigos = [];
    for (let i = 0; i < 10; i++) codigos.push(generarDigito());
}

/* -------------------------
   ELEMENTOS DEL DOM
------------------------- */

const startBtn = document.getElementById("startBtn");
const startScreen = document.querySelector(".start-screen");
const gameArea = document.getElementById("gameArea");
const candadoBox = document.getElementById("candadoBox");

/* -------------------------
   INICIO DEL ESCAPE ROOM
------------------------- */

startBtn.addEventListener("click", () => {

    alumno = document.getElementById("nombreAlumno").value.trim();
    curso = document.getElementById("cursoAlumno").value.trim();

    if (alumno === "" || curso === "") {
        alert("Por favor, escribe tu nombre y tu curso antes de comenzar.");
        return;
    }

    generarCodigos();
    candado = Array(10).fill(" _ ");
    retoActual = 0;

    startScreen.style.display = "none";
    gameArea.style.display = "block";

    setTimeout(() => {
        gameArea.style.opacity = "1";
    }, 50);

    mostrarCandado();
    cargarReto();
});

/* -------------------------
   MOSTRAR CANDADO
------------------------- */

function mostrarCandado() {
    candadoBox.innerHTML = `
        <h3>Candado dimensional</h3>
        <div class="candado-line">
            ${candado.map(c => `<span class="slot">${c}</span>`).join("")}
        </div>
    `;
}

/* -------------------------
   RETOS – 3.º ESO
------------------------- */

const retos = [

    /* 1. Longitud */
    { pregunta: "4,25 km → m", respuesta: "4250" },

    /* 2. Masa */
    { pregunta: "0,084 kg → g", respuesta: "84" },

    /* 3. Capacidad */
    { pregunta: "0,035 L → mL", respuesta: "35" },

    /* 4. Tiempo */
    { pregunta: "2,75 h → min", respuesta: "165" },

    /* 5. Área */
    { pregunta: "0,42 m² → cm²", respuesta: "4200" },

    /* 6. Área */
    { pregunta: "35000 mm² → m²", respuesta: "0,035" },

    /* 7. Volumen */
    { pregunta: "0,006 m³ → dm³", respuesta: "6" },

    /* 8. Volumen */
    { pregunta: "4500 cm³ → dm³", respuesta: "4,5" },

    /* 9. Magnitud compuesta: velocidad */
    { pregunta: "72 km/h → m/s", respuesta: "20" },

    /* 10. Magnitud compuesta: densidad */
    { pregunta: "2,7 g/cm³ → kg/m³", respuesta: "2700" }

];

/* -------------------------
   CARGAR RETO
------------------------- */

function cargarReto() {
    const r = retos[retoActual];

    gameArea.innerHTML = `
        <h2>Reto ${retoActual + 1} de 10</h2>
        <p><strong>Convierte:</strong> ${r.pregunta}</p>

        <input type="text" id="respuesta" placeholder="Escribe la respuesta...">
        <button class="btn" onclick="comprobar()">Comprobar</button>

        <p id="feedback"></p>
    `;
}

/* -------------------------
   COMPROBAR RESPUESTA
------------------------- */

function comprobar() {
    const r = retos[retoActual];

    const user = document.getElementById("respuesta").value
        .trim()
        .replace(".", ",");

    const fb = document.getElementById("feedback");

    if (user === r.respuesta) {

        fb.textContent = "✔ Correcto";
        fb.style.color = "#00ff9d";

        candado[retoActual] = codigos[retoActual];
        mostrarCandado();

        retoActual++;

        if (retoActual < 10) {

            setTimeout(() => cargarReto(), 1200);

        } else {

            setTimeout(() => pantallaFinal(), 1200);

        }

    } else {

        fb.textContent = "✘ Incorrecto. Revisa la conversión.";
        fb.style.color = "#ff4b4b";

    }
}

/* -------------------------
   PANTALLA FINAL
------------------------- */

function pantallaFinal() {
    gameArea.innerHTML = `
        <div class="final-container">

            <h2>¡Lo lograste!</h2>

            <p>
                ¡Has conseguido desbloquear el candado resolviendo
                todos los retos!
            </p>

            <div class="final-layout">

                <img src="desbloqueado.jpeg"
                     class="final-img"
                     alt="Candado desbloqueado">

                <div class="final-code-box">

                    <h3>Código final</h3>

                    <p class="final-code">
                        ${codigos.join(" - ")}
                    </p>

                    <button class="btn" onclick="exportarDiplomaFinal()">
                        Descargar diploma
                    </button>

                    <button class="restart-button" onclick="reiniciarJuego()">
                        Reiniciar escape room
                    </button>

                </div>

            </div>

        </div>
    `;
}

/* -------------------------
   EXPORTAR DIPLOMA FINAL
------------------------- */

function exportarDiplomaFinal() {
    const panel = document.getElementById("diplomaFinal");

    document.getElementById("diplomaNombre").innerText = alumno;
    document.getElementById("diplomaCurso").innerText = curso;
    document.getElementById("diplomaCodigo").innerText = codigos.join(" - ");

    panel.style.display = "block";

    html2canvas(panel, { scale: 2 }).then(canvas => {

        const enlace = document.createElement("a");

        enlace.download =
            `${alumno}_${curso}_diploma_escape_room.png`;

        enlace.href = canvas.toDataURL("image/png");

        enlace.click();

        panel.style.display = "none";
    });
}

/* -------------------------
   REINICIAR ESCAPE ROOM
------------------------- */

function reiniciarJuego() {
    location.reload();
}