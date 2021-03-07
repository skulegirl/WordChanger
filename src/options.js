var searchTerms = document.getElementById('searchTerms');
var data = [];
var i = 0;

document.getElementById('add').addEventListener('click', function() {
	var searchDiv = document.createElement('div');
  var input = document.createElement('input');
  var replace = document.createElement('input');
  var minus = document.createElement('button')
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search Term');
  replace.setAttribute('type', 'text');
  replace.setAttribute('placeholder', 'Replace Term');
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
});

function DeleteLine(event) {
	var targetButton = event.target;
  var parentElement = targetButton.parentElement;
  parentElement.remove();
}
// Saves options to chrome.storage
function save_options() {
  var search1 = document.getElementById('search1').value;
  var replace1 = document.getElementById('replace1').value;
chrome.storage.sync.set({
    search1: search1,
    replace1: replace1,

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
    search1: '',
    replace1: '',
  }, function(items) {
    document.getElementById('search1').value = items.search1;
    document.getElementById('replace1').value = items.replace1;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);