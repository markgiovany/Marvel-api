const marvel = {

  render: (nameStartsWith = '', page = 1) => {
    const offset = (page - 1) * 20;

   
  

    let urlAPI = `https://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=6a2421eec9a6fa554c7e5b9967620440&hash=600959899af81bf3ed3f45ae50cf5bdf`
    if (nameStartsWith) {
      urlAPI += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`
    }

    const container = document.querySelector('#marvel-row')
    const pagination = document.querySelector('#pagination')
    let contentHTML = ''

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        const results = json.data.results;
        const total = json.data.total;
        const totalPages = Math.ceil(total / 20);

        

        for (const hero of results) {
          const image = `${hero.thumbnail.path}.${hero.thumbnail.extension}`
          const name = hero.name
          const comics = hero.comics.available
          const series = hero.series.available;
          const events = hero.events.available;
          const urlHero = hero.urls[0]?.url || '#';

          contentHTML += `
            <div class="character">
              <img src="${image}" alt="${name}">
              <div class="character_content">
                <h3>${name}</h3>
                <p><strong>Cómics disponibles:</strong> ${comics}</p>
                <p>Series disponibles: ${series}</p>
                <p>Eventos disponibles: ${events}</p>
                <a href="${urlHero}" target="_blank">Ver más</a>
              </div>
            </div>
          `;
        }

        container.innerHTML = contentHTML;

        
        let pagesHTML = '';
        for (let i = 1; i <= totalPages; i++) {
          pagesHTML += `<a href="?page=${i}"">${i}</a>`
        }
        pagination.innerHTML = pagesHTML
      })
  }
}


const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page")) || 1


document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchInput').value.trim()
  history.pushState(null, "", "?page=1")
  marvel.render(searchTerm, 1)
})




marvel.render('', currentPage)