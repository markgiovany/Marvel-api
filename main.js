const dragonBall = {
  currentPage: 1,
  limit: 10,
  totalPages: 6, 
  renderCharacters: function () {
    const urlAPI = `https://dragonball-api.com/api/characters?page=${this.currentPage}&limit=${this.limit}`;
    const container = document.querySelector('#dragon-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => res.json())
      .then(json => {
        const characters = json.items || json;

        characters.forEach(character => {
  contentHTML += `
    <div class="character">
      <a href="personajes.html?id=${character.id}"><img src="${character.image}" alt="${character.name}"></a>
      <div class="character_content">
        <h2>${character.name}</h2> 
        <h6>${character.race} - ${character.gender}</h6>
        <h6>Ki base: <p>${character.ki}</p></h6>
        <h6>Ki total: <p>${character.maxKi}</p></h6>
        <h6>Afiliación: <p>${character.affiliation}</p></h6>
        
      </div>
    </div>
  `;
});

        container.innerHTML = contentHTML;
        this.renderPagination();
      });
  },

  renderPagination: function () {
    const paginationContainer = document.querySelector('#pagination');
    let pagesHTML = '';

    for (let i = 1; i <= this.totalPages; i++) {
      const activeClass = i === this.currentPage ? 'active' : '';
      pagesHTML += `<a href="#" class="${activeClass}" data-page="${i}">${i}</a> `;
    }

    paginationContainer.innerHTML = pagesHTML;

    document.querySelectorAll('#pagination a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentPage = parseInt(e.target.getAttribute('data-page'));
        this.renderCharacters();
      });
    });
  },

  renderPlanets: function () {
    const planetsContainer = document.querySelector('#planets');
    let contentHTML = '';

    fetch('https://dragonball-api.com/api/planets')
      .then(res => res.json())
      .then(planets => {
        planets.forEach(planet => {
          contentHTML += `
            <div class="planet">
              <h3>${planet.name}</h3>
              <p>Descripción: ${planet.description}</p>
              <p>Región: ${planet.region}</p>
            </div>
          `;
        });

        planetsContainer.innerHTML = contentHTML;
      });
  },

  init: function () {
    this.renderCharacters();
    this.renderPlanets();
  }
};

dragonBall.init();