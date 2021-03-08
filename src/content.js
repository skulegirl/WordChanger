chrome.storage.sync.get({
    searches: [''],
    replaces: [''],
  }, function(items) {
    console.log("Test!!!!");
    items.searches.forEach((element, i) => {
      if (element !== '' && items.replaces[i] !== '') {
        let regex_val = new RegExp('\\b' + element + '\\b', 'gi');
        document.body.innerHTML = document.body.innerHTML.replace(regex_val, items.replaces[i]);
    }
    });
      
});