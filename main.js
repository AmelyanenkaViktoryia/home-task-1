const btn = document.getElementById('btn').addEventListener('click', btnCallback);

function getSources() {
  let xhr = new XMLHttpRequest();
  let result;
  xhr.open('GET', 'https://newsapi.org/v2/sources?apiKey=15815122ee5a4cbcb7f70331e12826a7', false);
  xhr.send();
  if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText );
  } else {
    result = xhr.responseText;
    result = JSON.parse(result);
    renderSelectItem(result);
  }
}

getSources(); 

function getSelectValue() {
  let el = document.getElementById('select');
  let selectedNewChannel = el.value;
  return selectedNewChannel;
}

function requestNews(){
  let xhr = new XMLHttpRequest();
  let result;
  let url = `https://newsapi.org/v2/top-headlines?sources=${getSelectValue()}&apiKey=15815122ee5a4cbcb7f70331e12826a7`;
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText );
  } else {
    result = xhr.responseText;
    result = JSON.parse(result);
  }
  renderNews(result);
}

function btnCallback() {
  requestNews();
}

function renderSelectItem(news){ 
  let container = document.getElementById('news');
  let names = news.sources.map(function(x){ 
    return `<option>${x.id}</option>` 
  }) 
  let ul = document.createElement('select'); 
  ul.setAttribute('id', 'select');
  ul.setAttribute('class', 'col-md-6');
  for(var li of names){ 
    ul.innerHTML += li; 
  } 
  container.parentNode.insertBefore(ul, container); 
}

function renderNews(news){     
  let newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';
  let names = news.articles.map(function(x){ 
  return `<h1>${x.title}</h1>
  <img src="${x.urlToImage}">
  <p>${x.content}</p>
  <p>${x.author}</p>
  <a href="${x.url}">Read more</a>` 
  }) 
  let ul = document.createElement('ol'); 
  for(var li of names){ 
  ul.innerHTML += li; 
  } 
  newsContainer.appendChild(ul); 
}