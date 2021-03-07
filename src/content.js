chrome.storage.sync.get({
    search1: '',
    replace1: '',
  }, function(items) {
    if (items.search1 !== '' && items.replace1 !== '') {
        let regex_val = new RegExp('\\b' + items.search1 + '\\b', 'gi');
        document.body.innerHTML = document.body.innerHTML.replace(regex_val, items.replace1);
    }
});