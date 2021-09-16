//0. definir o array que vai guardar os filmes
const moviesArray = JSON.parse(localStorage.getItem('movies')) || [];

const movieForm = document.querySelector('#movieForm');

//7. criar função de popular os filmes
function showMovies(clearMovies = false) {
  //8. definir o moviecontent pra poder manipular o DOM
  const movieContent = document.querySelector('.content');

  //12. limpar o conteudo da div sempre que um novo filme for adicionado
  if (clearMovies) {
    movieContent.innerHTML = '';
  }

  //9. checar se o array existe e é maior que zero
  if (moviesArray.length > 0) {
    //checar se o array de filmes tem algum filme
    // aqui vamos mapear os nossos filmes
    //11. utilizar o loop forEach para imprimir os nossos filmes
    // for
    // map
    moviesArray.forEach((movie) => {
      movieContent.innerHTML =
        movieContent.innerHTML +
        `<div class="movie-card" onclick="">
      <div class="movie-details">Titulo: ${movie.movieTitle}<br />
      Descrição: ${movie.descritpion}<br />
      Estrelando: ${movie.actors}<br />
      </div>
      <img src="${movie.image}" alt="${movie.movieTitle}" /><br />
      </div>`;
    });
  } else {
    movieContent.innerHTML = 'Sem filmes disponiveis';
  }
}

//1. criar função para mostrar o formulario
function showAddMoviesModal() {
  movieForm.style = 'display: flex';
}

//2. adicionar evento para pegar dados do formulario
movieForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let movie = {};

  movie.movieTitle = document.getElementById('movieTitle').value;
  movie.descritpion = document.getElementById('description').value;
  movie.actors = document.getElementById('actors').value;
  movie.image = document.getElementById('image').value;

  const alertMessage = document.querySelector('.alert');

  //3. checar se o form esta vazio
  if (
    movie.movieTitle === '' ||
    movie.descritpion === '' ||
    movie.actors === '' ||
    movie.image === ''
  ) {
    //3.1 mostrar mensagens caso esteja vazio
    alertMessage.innerHTML = 'Por favor, preencha todos os dados.';
    alertMessage.style = 'display: block; color: red';
  } else {
    //4. adiconar informações no nosso array e no localStorage
    //push -> adiciona um item no array
    //pop -> remove
    moviesArray.push(movie);
    localStorage.setItem('movies', JSON.stringify(moviesArray));
    //vamos chamar a função de mostrar os filmes
    showMovies(true);
    //5. mostrar a mensagem de sucesso
    alertMessage.innerHTML = 'Filme adicionado com sucesso';
    alertMessage.style = 'display: block; color: green';
    //6. remover essa mensagem e resetar os dados do formulario
    setTimeout(() => {
      //vamos remover o conteudo do .alert
      alertMessage.innerHTML = '';
      //setar o formulario para desaparecer com display none
      movieForm.style = 'display: none';
      //vamos resetar os valores do nosso formulario
      movieForm.reset();
    }, 2000);
  }
});

//10. chamar a função ao carregar a página.
window.onload = function () {
  showMovies();
};
