let posts = [{
    'author': 'Fernknorke',
    'location': 'Thailand',
    'profile-image': 'img/profile-pic.PNG',
    'image': 'img/island.jpg',
    'description': 'In unserem letzten Urlaub auf einer einsamen Insel',
    'comments': ['wow. Sieht super aus']
},
{
    'author': 'Karlkatze',
    'location': 'Bali',
    'profile-image': 'img/Katze.jpg',
    'image': 'img/forrest.jpg',
    'description': 'Montains of Bali. Wunderschön mit den Wolken',
    'comments': []
}, {
    'author': 'Fernknorke',
    'location': 'Thailand',
    'profile-image': 'img/profile-pic.PNG',
    'image': 'img/Longtail.jpg',
    'description': 'Profile of a Longtailboat-Driver',
    'comments': []
}, {
    'author': 'Mr_Jing',
    'location': 'Earth',
    'profile-image': 'img/geiger.jpg',
    'image': 'img/chicken.jpg',
    'description': 'Chicken run',
    'comments': []
}, {
    'author': 'Karlkatze',
    'location': 'Oberstorf',
    'profile-image': 'img/Katze.jpg',
    'image': 'img/path.jpg',
    'description': 'Wunderschöne Wanderung in den Allgäuer Alpen. Mit Hüttenübernachtung und allem was dazu gehört',
    'comments': []
}]

let profiles = [{
    'name': 'Fernknorke',
    'pic': 'img/profile-pic.PNG'
}, {
    'name': 'Mr_Jing',
    'pic': 'img/geiger.jpg'
}, {
    'name': 'Karlkatze',
    'pic': 'img/Katze.jpg'
}, {
    'name': 'Gocklrunner12',
    'pic': 'img/chicken.jpg'
}]

function init() {
    loadPosts();
    loadSuggestions();
}

function loadPosts() {
    document.getElementById('posts').innerHTML += '';
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        document.getElementById('posts').innerHTML += createPostHTML(element, i);
        loadComments(element, i);
    }
}

function loadSuggestions() {
    let suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    suggestions.innerHTML += createSuggestionTitleHTML();
    for (let i = 0; i < profiles.length; i++) {
        let element = profiles[i];
        suggestions.innerHTML += createSuggestionHTML(element);
    }
}

function filterByName() {
    let nameToSearch = document.getElementById('search').value;
    nameToSearch = nameToSearch.toLowerCase();
    document.getElementById('posts').innerHTML = '';
    let haveFound = false;
    for (let i = 0; i < posts.length; i++) {
        let element = posts[i];
        if (element['author'].toLocaleLowerCase().includes(nameToSearch)) {
            document.getElementById('posts').innerHTML += createPostHTML(element);
            haveFound = true;
        }
    }
    if (haveFound === false || nameToSearch === '') {
        loadPosts();
    }
}

function loadComments(element, i) {
    let comments = element['comments'];
    let commentsContainer = document.getElementById('comments' + i)
    commentsContainer.innerHTML = '';
    if (comments.length === 0) {
    } else {
        for (let y = 0; y < comments.length; y++) {
            let comment = comments[y];
            commentsContainer.innerHTML += createCommentsHTML(comment)
        }
    }
}

function pushComment(element, i) {
    let commentToPush = document.getElementById('input' + i).value;
    if (commentToPush === '') {
        alert('Bitte Kommentar eingeben')
    } else {
        posts[i].comments.push(commentToPush);
    loadComments(posts[i], i)
    document.getElementById('input' + i).value = '';
    }
}

// Templates

function createCommentsHTML(comment) {
    return /*HTML*/ `<div class="comment">... ${comment}</div>`
}

function createSuggestionHTML(element) {
    return /*HTML*/ `<div class="suggestion-container">
    <img src="${element['pic']}" alt="">
    <span>${element['name']}</span>
</div>`
}

function createSuggestionTitleHTML() {
    return /*HTML*/ `<div class="suggestion-header-container">
    <span>Personen die Du vielleicht kennst</span>
</div>`
}

function createPostHTML(element, i) {
    return /*html*/ `<div class="post">
    <div class="post-head">
        <div class="post-profile-pic">
            <img src="${element['profile-image']}" alt="">
        </div>
        <div class="post-head-content">
            <div class="post-author">${element['author']}</div>
            <div class="post-location">${element['location']}</div>
        </div>
    </div>
    <img src="${element['image']}" alt="" class="image">
    <div class="icons-container">
        <img src="img/favorite-3-24.png" alt="">
        <img src="img/speech-bubble-24.png" alt="">
        <img src="img/location-24.png" alt="">
    </div>
    <div class="description"><b>${element['author']} </b>${element['description']}</div>
    <div id="comments${i}" class="comments">
    </div>
    <div class="comment-container">
        <div class="comment-left">
            <img src="img/happy-24.png" alt="">
            <textarea type="text" class="input" placeholder="Kommentar" id="input${i}"></textarea>
        </div>
        <div class="comment-right" onclick="pushComment('${element}','${i}')">Posten</div>
    </div>
</div>`
}