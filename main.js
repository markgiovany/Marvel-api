const dragonBall = {
  render: () => {
    const urlAPI = 'https://dragonball-api.com/api/characters';
    const container = document.querySelector('#dragon-row');
    let contentHTML = "";

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        const characters = json.items || json; 

        characters.forEach(character => {
          contentHTML += `
            <div class="character">
             <a href=""> <img src="${character.image}" alt="${character.name}" ></a>
                <div class="character_content">
                  <h2>${character.name} </h2> 
                  <h6>${character.race} - ${character.gender}</h6>
                  <h6>Ki base: <p>${character.ki}</p></h6>
                  <h6>Ki total: <p>${character.maxKi}</p></h6>
                  <h6>afilación: <p>${character.affiliation}</p></h6>
                  
                  
                  
                </div>
            </div>
          `;
        });

        container.innerHTML = contentHTML;
      })
     
  }
};

dragonBall.render();