console.log("inicio")

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', searchSubtitle);

titleJson2HtmlTable('[{"image": "http://i.legendas.tv/poster/214x317/60/4f/tt412142.jpg","id": "25402","span": "Hoouse M.D.","text": "House M.D. - 8ª Temporada"},{"image": "http://i.legendas.tv/poster/214x317/7c/4c/legendas_tv_20150818181122.jpg","id": "38680","span": "Full House","text": "Três é Demais - 8ª Temporada"}]');

function searchSubtitle() {
    console.log(searchInput.value);
    var resp = httpGet("http://127.0.0.1:8080/titles/" + searchInput.value);
    titleJson2HtmlTable(resp);
}

function getTitleSubs(titleId) {
    console.log(titleId);
    var resp = httpGet("http://127.0.0.1:8080/subtitles/" + titleId);
    subtitlesJson2HtmlTable(resp);
}

function subtitlesJson2HtmlTable(json) {
    var subsTable = ` 
        <table class="paleBlueRows">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Class</th>
                    <th>Subtitle</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
    `;

    var subs = JSON.parse(json);
    for (var i = 0; i < subs.length; i++) {
        var row = `
            <tr>
                <td>${subs[i].number}</td>
                <td>${subs[i].class}</td>
                <td>
                    <div>
                        <p>${subs[i].name}</p>
                        <p>${subs[i].data}</p>
                    </div>
                </td>
                <td>${subs[i].id}</td>
            </tr>
        `;
        subsTable = subsTable + row;
    }

    var endTable = `
            </tbody>
        </table>
    `;

    var t = document.getElementById("subs");
    t.innerHTML = subsTable + endTable;
}

function titleJson2HtmlTable(titlesJson) {
    var titleTable = `
        <table class="paleBlueRows">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Span</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
    `;

    var endTable = `
            </tbody>
        </table>
    `;

    var titles = JSON.parse(titlesJson);
    for (var i = 0; i < titles.length; i++) {
        var row = `
            <tr onclick="getTitleSubs(${titles[i].id})">
                <td>${titles[i].text}</td>
                <td>${titles[i].span}</td>
                <td>
                    <a>${titles[i].id}</a>
                </td>
            </tr>
        `;
        titleTable = titleTable + row;
    }

    var t = document.getElementById("subs");
    t.innerHTML = titleTable + endTable;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}