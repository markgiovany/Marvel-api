const dragonBall = {
  currentPage: 1,
  limit: 10,
  totalPages: 6,
  allCharacters: [],

  fetchAllCharacters: async function () {
   
    const todos = [];
    for (let i = 1; i <= this.totalPages; i++) {
      const res = await fetch(`https://dragonball-api.com/api/characters?page=${i}&limit=${this.limit}`);
      const data = await res.json();
      const items = data.items || data;
      for (let c of items) {
        todos.push(c);
      }
    }
    this.allCharacters = todos;
  },

  renderCharacters: function () {
    const contenedor = document.querySelector('#dragon-row');
    const busqueda = document.querySelector('#search-input').value.toLowerCase();
    let html = '';

    if (busqueda === '') {
      
      fetch(`https://dragonball-api.com/api/characters?page=${this.currentPage}&limit=${this.limit}`)
        .then(res => res.json())
        .then(data => {
          const chars = data.items || data;
          for (let personaje of chars) {
            html += `
              <div class="character">
                <a href="#?id=${personaje.id}"><img src="${personaje.image}" alt="${personaje.name}"></a>
                <div class="character_content">
                  <h2>${personaje.name}</h2>
                  <h6>${personaje.race} - ${personaje.gender}</h6>
                  <h6>Ki base: <p>${personaje.ki}</p></h6>
                  <h6>Ki total: <p>${personaje.maxKi}</p></h6>
                  <h6>Afiliación: <p>${personaje.affiliation}</p></h6>
                </div>
              </div>
            `;
          }
          contenedor.innerHTML = html;
          this.renderPagination();
        });
    } else {
      
      const filtrados = this.allCharacters.filter(personaje =>
        personaje.name.toLowerCase().includes(busqueda)
      );
      for (let p of filtrados) {
        html += `
          <div class="character">
            <a href="#?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
            <div class="character_content">
              <h2>${p.name}</h2>
              <h6>${p.race} - ${p.gender}</h6>
              <h6>Ki base: <p>${p.ki}</p></h6>
              <h6>Ki total: <p>${p.maxKi}</p></h6>
              <h6>Afiliación: <p>${p.affiliation}</p></h6>
            </div>
          </div>
        `;
      }
      contenedor.innerHTML = filtrados.length > 0 ? html : '<p>No se encontraron personajes.</p>';
     
      document.querySelector('#pagination').innerHTML = '';
    }
  },

  renderPagination: function () {
    const paginacion = document.querySelector('#pagination');
    let paginasHTML = '';

    for (let i = 1; i <= this.totalPages; i++) {
      const active = i === this.currentPage ? 'active' : '';
      paginasHTML += `<a href="#" class="${active}" data-page="${i}">${i}</a> `;
    }
    paginacion.innerHTML = paginasHTML;

    const enlaces = document.querySelectorAll('#pagination a');
    for (let enlace of enlaces) {
      enlace.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentPage = parseInt(e.target.getAttribute('data-page'));
        this.renderCharacters();
      });
    }
  },

  init: async function () {
   
    await this.fetchAllCharacters();

    
    this.renderCharacters();

    
    document.querySelector('#search-input').addEventListener('input', () => {
      this.renderCharacters();
    });
  }
};

dragonBall.init();