var items = {}

Object.keys(langs).map(function(i) {
  items[i] = pages.map(function(v) {
    return {
      title: langs[i].pages[v] | v,
      path: '/' + langs[i].path + '/' + v,
      matchPath: new RegExp('^\/(' + v + '|' + v + 's)')
    }
  });
  if (i !== '日本語' && i !== 'English') {
    langItems.push({
      title: i,
      path: '/' + langs[i].path + '/',
      matchPath: new RegExp('^\/' + langs[i].abbrev)
    })
    // nav[langs[i].path] = [
    //   {title: langs[i].menu.home, path: '/'},
    //   {title: 'API Instructons', type: 'dropdown', items: items['English']},
    //   {title: 'ChangeLog', path: '/changelog'},
    //   {title: 'English', type: 'dropdown', items: langItems}      
    // ]
  }
});

var nav = {
  default: [
    {title: 'はじめに', path: '/'},
    {title: 'API説明書', type: 'dropdown', items: items['日本語']},
    {title: 'ChangeLog', path: '/changelog'},
    {title: '日本語', type: 'dropdown', items: langItems}
  ],
  'lang/en': [
    {title: 'Home', path: '/'},
    {title: 'API Instructons', type: 'dropdown', items: items['English']},
    {title: 'ChangeLog', path: '/changelog'},
    {title: 'English', type: 'dropdown', items: langItems}
  ],
}
docute.init({
  repo: 'every-sense/UserDocument',
  tocVisibleDepth: 4,
  debug: true,
  sidebar: true,
  'edit-link': 'https://github.com/daiyanze/everysense_api_doc/tree/master/docs/',
  nav: nav,
});