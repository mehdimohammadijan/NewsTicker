

const getNews = (category) => {

    const url='https://newsapi.org/v2/top-headlines?category='+category+'&apiKey=5a5bb428c42a467191ca226e2eb753d6'

    var req = new Request(url);
    let response=[]
        fetch(req).then(res => res.json()).then(data => response=data.articles )
        .catch(e => console.log(e.message))
        console.log(response)
return response
}
export default getNews

    