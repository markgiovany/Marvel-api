const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const id = searchParams.get("id");

fetch("https://dragonball-api.com/api/characters/" + id)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    const container = document.querySelector(".container");
    const title = document.querySelector("#title");
    const characterImage = document.querySelector("#character--image");

    title.innerText = json.name;
    characterImage.setAttribute("src", json.image);

    let transformationsHTML = '';
    if (json.transformations && json.transformations.length > 0) {
      transformationsHTML = `
        <h6>Transformaciones:</h6>
        <ul class="lin">
          ${json.transformations.map(t => ` <li>${t.name || t}</li> ` ).join('')}
        </ul>
      `;
    } else {
      transformationsHTML = ` <h6>Transformaciones: Ninguna</h6> `;
    }

    const card = `       
      <div class="character--info">
        <div class="character_contentt">
          <p>${json.description || ''}</p>
          <h6>Afiliación: <span>${json.affiliation}</span></h6>
          ${transformationsHTML}
          <div class="botton"><a href="index.html">Ir al Inicio</a></div>
        </div>
      </div>
    `;

    container.innerHTML = card;
  })
  .catch(error => {
    console.error('Error:', error);
    const container = document.querySelector(".container");
    container.innerHTML = ` <p>Error cargando personaje: ${error.message}</p> `;
  });