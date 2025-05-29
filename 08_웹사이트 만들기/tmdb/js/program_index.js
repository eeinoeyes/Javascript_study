const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRjZGJkZTk3Y2IyYmFkNjIyOWE5MDVlY2NiNTI4NSIsIm5iZiI6MTc0ODM5NDAwMi45MTI5OTk5LCJzdWIiOiI2ODM2NjAxMmU0MjkzNzE0ZWFlYjNhNTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AGDmi80CScGY3uc5xTJVlS3gJikL1G3R-60bJ__Q1FQ',
   },
}

const programUrl = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=3&with_original_language=ko'

const getProgramUrl = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()
      const results = data.results
      console.log(results)
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 2) {
         const programs = results.slice(i, i + 2)
         let rowHtml = '<div class="row">'
         programs.forEach((program) => {
            rowHtml += `
                  <div class="col-sm-6 p-3">
                <div class="card">
                  <a href="./program_detail.html?id=${program.id}" style="width:50%;height:100%"><img src="https://image.tmdb.org/t/p/w500${program.poster_path}" class="card-img-top poster" alt="${program.name}"  /></a>
                  <div class="card-body">
                    <p class="card-text title">${program.name}</p>
                    <p class="card-text average">${program.vote_average === 0 ? '평점 정보 없음' : program.vote_average.toFixed(1) + '점'}</p>
                    <p class="synopsis ellipsis" >${!program.overview ? '줄거리 정보 없음' : program.overview}</p>
                  </div>
                </div>
              </div>
                  `
         })
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
getProgramUrl(programUrl)
