const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRjZGJkZTk3Y2IyYmFkNjIyOWE5MDVlY2NiNTI4NSIsIm5iZiI6MTc0ODM5NDAwMi45MTI5OTk5LCJzdWIiOiI2ODM2NjAxMmU0MjkzNzE0ZWFlYjNhNTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AGDmi80CScGY3uc5xTJVlS3gJikL1G3R-60bJ__Q1FQ',
   },
}

const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 1. 영화 상세 정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      const rowHtml = `
                      <div class="row">
                  <div class="col-sm-3" style="text-align: center">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%" />
                  </div>
                  <div class="col-sm-9 movie-detail">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>${data.release_date}</li>
                        <li>${data.genres.map((genre) => ' ' + genre.name)}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1) + '점'}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>
       `

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

// 2. 출연 배우 데이터 바인딩
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      let castRowHtml = `<div class="row" style="margin-top:30px">`
      for (let i = 0; i < data.cast.length; i++) {
         let profileImg = !data.cast[i].profile_path ? `./image/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `
      <div class='col-sm-2 p-3'>
         <div class="card">
            <img src=${profileImg}" class="card-img-top" alt="">
             <div class="card-body" >
                <p class="card-text">${data.cast[i].name}</p>
             </div>
         </div>
      </div>
       `
         if (i === 5) {
            break
         }
      }
      castRowHtml += `</div>`
      mainContainer.innerHTML += castRowHtml
      // innerHtml은 위 상세정보 코드에서 이미 정의돼있으므로 이퀄 = 이 아니라 += 해서 자식태그로 추가할 수 있다
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
async function autoAction(data) {
   await getDetailMovie(movieDetailUrl)
   await getCreditsMovie(movieCreditsUrl)
}

autoAction(movieDetailUrl)
