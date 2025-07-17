const dragonBall = {
  currentPage: 1,
  limit: 10,
  totalPages: 6,
  searchQuery: '',
  selectedRace: '',
  selectedGender: '',
  selectedAffiliation: '',

  renderCharacters: function () {
    let urlAPI = `https://dragonball-api.com/api/characters?page=${this.currentPage}&limit=${this.limit}`;

    if (this.searchQuery) urlAPI += `&name=${encodeURIComponent(this.searchQuery)}`;
    if (this.selectedRace) urlAPI += `&race=${encodeURIComponent(this.selectedRace)}`;
    if (this.selectedGender) urlAPI += `&gender=${encodeURIComponent(this.selectedGender)}`;
    if (this.selectedAffiliation) urlAPI += `&affiliation=${encodeURIComponent(this.selectedAffiliation)}`;

    const container = document.querySelector('#dragon-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => res.json())
      .then(json => {
        const characters = json.items || json;

        if (!characters.length) {
          container.innerHTML = '<p>No se encontraron personajes.</p>';
          return;
        }

        characters.forEach(character => {
          contentHTML += `
            <div class="character">
              <a href="personajes.html?id=${character.id}">
                <img src="${character.image}" alt="${character.name}">
              </a>
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
      pagesHTML += `<a href="#" class="${activeClass}" data-page="${i}">${i}</a>`;
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
    if (!planetsContainer) return;
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
    this.setupSearch();
    this.setupFilters();
    this.renderCharacters();
    this.renderPlanets();
  },

  setupSearch: function () {
    const input = document.querySelector('#search-input');
    const button = document.querySelector('#search-btn');

    button.addEventListener('click', () => {
      this.searchQuery = input.value.trim();
      this.currentPage = 1;
      this.renderCharacters();
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        button.click();
      }
    });
  },

  setupFilters: function () {
    const raceSelect = document.querySelector('#filter-race');
    const genderSelect = document.querySelector('#filter-gender');
    const affiliationSelect = document.querySelector('#filter-affiliation');

    const handleFilterChange = () => {
      this.selectedRace = raceSelect.value;
      this.selectedGender = genderSelect.value;
      this.selectedAffiliation = affiliationSelect.value;
      this.currentPage = 1;
      this.renderCharacters();
    };

    raceSelect.addEventListener('change', handleFilterChange);
    genderSelect.addEventListener('change', handleFilterChange);
    affiliationSelect.addEventListener('change', handleFilterChange);
  }
};

dragonBall.init();