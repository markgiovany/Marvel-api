const marvel = {
    render: () =>{
    const urlAPI = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=6a2421eec9a6fa554c7e5b9967620440&hash=600959899af81bf3ed3f45ae50cf5bdf';
    const container = document.querySelector('#marvel-row');
    let contentHTML = '';

    
    fetch(urlAPI)
        .then(res=> res.json())
        .then((json) =>{

            for(const hero of json.data.results){

                let urlHero = hero.urls[0].url;
                contentHTML+= `
                <div class="character">
                                 
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                     <a href="${urlHero}" target="_blank">
                        <h3 class="title"> ${hero.name} </h3>
                    </a>    
                </div>
                `
                
            }
            container.innerHTML = contentHTML;
        })

 }
    
};

marvel.render();