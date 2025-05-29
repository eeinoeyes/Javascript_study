const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRjZGJkZTk3Y2IyYmFkNjIyOWE5MDVlY2NiNTI4NSIsIm5iZiI6MTc0ODM5NDAwMi45MTI5OTk5LCJzdWIiOiI2ODM2NjAxMmU0MjkzNzE0ZWFlYjNhNTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AGDmi80CScGY3uc5xTJVlS3gJikL1G3R-60bJ__Q1FQ',
   },
}
const urlParams = new URLSearchParams(location.search)
const programId = urlParams.get('id')
const programUrl = `https://api.themoviedb.org/3/tv/${programId}?language=ko-KR`

const container = document.querySelector('main .container')

// 기본 정보
const getProgramInfo = async (programUrl) => {
   try {
      const response = await fetch(programUrl, options)
      const data = await response.json()
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `<div class="row">
               <div class="col-sm-3">
                  <img src=${imgSrc} alt="poster" class="poster-detail" />
               </div>
               <div class="col-sm-9 program-detail" >
                  <h2>${data.name}</h2>
                  <ul class="program-info">
                     <li>원제: ${data.original_name}</li>
                     <li>평점: ${data.vote_average.toFixed(1)}</li>
                     <li>최근 방영일: ${data.last_air_date}</li>
                     <li>처음 방영일: ${data.first_air_date}</li>
                  </ul>
                  <p>${data.overview}</p>
               </div>
               </div>
            `
      container.innerHTML = rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

// 시즌 정보

const getSeasonsInfo = async (programUrl) => {
   try {
      const response = await fetch(programUrl, options)
      const data = await response.json()
      let seasonData = `<div class="section">
      <ul class="season-list">`
      for (let i = 0; i < data.seasons.length; i++) {
         seasonData += `<li>${data.seasons[i].name} 보러 가기 (평점 ${data.seasons[i].vote_average.toFixed(1)}) - ${data.seasons[i].air_date} 방영</li>
           `
      }
      seasonData += '</ul></div>'
      container.innerHTML += seasonData
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
async function action(url) {
   await getProgramInfo(url)
   await getSeasonsInfo(url)
}

action(programUrl)
