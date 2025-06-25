const marvel = {
  render: (nameStartsWith = '') => {
    
    const urlAPI = nameStartsWith
      ? `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameStartsWith}&ts=1&apikey=6a2421eec9a6fa554c7e5b9967620440&hash=600959899af81bf3ed3f45ae50cf5bdf`
      : `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=6a2421eec9a6fa554c7e5b9967620440&hash=600959899af81bf3ed3f45ae50cf5bdf`;

    const container = document.querySelector('#marvel-row');
    let contentHTML = '';

    document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchInput').value.trim();
  marvel.render(searchTerm);
});


document.getElementById('searchInput').addEventListener('keypress', () => {
  if (p.key === 'Enter') {
    document.getElementById('searchBtn').click();
  }
});

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        if (json.data.results.length === 0) {
          container.innerHTML = '<p>No se encontraron personajes.</p>';
          return;
        }

        for (const hero of json.data.results) {
          const image = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
          const name = hero.name;
          const comics = hero.comics.available;
          const series = hero.series.available;
          const events = hero.events.available;
          const urlHero = hero.urls[0]?.url || '#';

          contentHTML += `
            <div class="character">
              <img src="${image}" alt="${name}">
              <div class="character_content">
                <h3>${name}</h3>
                <p><strong>Cómics disponibles: </strong> ${comics}</p>
                <p>Series disponibles: ${series}</p>
                <p>Eventos disponibles: ${events}</p>
                <a href="${urlHero}" target="_blank">Ver más</a>
              </div>
            </div>
          `;
        }

        container.innerHTML = contentHTML;
      });
  }
};





marvel.render();