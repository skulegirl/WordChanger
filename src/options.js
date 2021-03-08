var searchTerms = document.getElementById('searchTerms');
var data = [];
var i = 0;
console.log("hi")

document.getElementById('add').addEventListener('click', AddLine);

function DeleteLine(event) {
	var targetButton = event.target;
  var parentElement = targetButton.parentElement;
  parentElement.remove();
}
function AddLine()
{
  var searchDiv = document.createElement('div');
  var input = document.createElement('input');
  var replace = document.createElement('input');
  var minus = document.createElement('button')
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search Term');
  replace.setAttribute('type', 'text');
  replace.setAttribute('placeholder', 'Replace Term');
  input.classList.add("searchInput");
  replace.classList.add("replaceInput");
  minus.textContent = '-';
  searchDiv.classList.add('search-term')
  searchDiv.setAttribute('id', 'search-Div-' + i);
  minus.setAttribute('id', 'minus-Button-' + i)
  minus.classList.add('minusButton')
  minus.addEventListener('click', DeleteLine)
  var button = document.createElement('button');
  i++;
  searchTerms.appendChild(searchDiv);
  searchDiv.appendChild(input);
  searchDiv.appendChild(replace);
  searchDiv.appendChild(minus);
  return searchDiv;
}

// Saves options to chrome.storage
function save_options() {
  console.log("In save options")
  var searches = Array.from(document.getElementsByClassName("searchInput")).map(x => x.value);
  var replaces = Array.from(document.getElementsByClassName("replaceInput")).map(x => x.value);
chrome.storage.sync.set({
    searches: searches,
    replaces: replaces,

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    searches: [''],
    replaces: [''],
  }, function(items) {
    items.searches.forEach( (element, i) => {
      var searchDiv
      if (i == 0){
        searchDiv = document.getElementsByClassName("search-term")[0];
      }
      else {
        searchDiv = AddLine();
      }
      Array.from(searchDiv.getElementsByClassName("searchInput")).forEach(x => x.value = element);
      Array.from(searchDiv.getElementsByClassName("replaceInput")).forEach(x => x.value = items.replaces[i]);
    });
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);