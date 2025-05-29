const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRjZGJkZTk3Y2IyYmFkNjIyOWE5MDVlY2NiNTI4NSIsIm5iZiI6MTc0ODM5NDAwMi45MTI5OTk5LCJzdWIiOiI2ODM2NjAxMmU0MjkzNzE0ZWFlYjNhNTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AGDmi80CScGY3uc5xTJVlS3gJikL1G3R-60bJ__Q1FQ',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         const movies = results.slice(i, i + 4)
         let rowHtml = '<div class="row">'
         movies.forEach((movie) => {
            rowHtml += `<div class="col-sm-3 p-3">
          <div class="card">
            <a href="#"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" /></a>
            <div class="card-body">
              <p class="card-text title">${movie.title}</p>
              <p class="card-text average">${movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        </div>`
         })
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getPlayingMovies(url)
