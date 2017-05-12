var items = {};
var nav = {};

Object.keys(langs).forEach(function(i) {
  if (!langs[i].enabled) {
    return;
  }
  items[i] = pages.map(function(v) {
    return {
      title: langs[i].pages[v] || v,
      path: '/lang/' + langs[i].abbrev + '/' + v,
      matchPath: new RegExp('^\/(' + v + '|' + v + 's)')
    };
  });
  if (i !== '日本語' && i !== 'English') {
    dropDownItems.push({
      title: i,
      path: '/lang/' + langs[i].abbrev + '/',
      matchPath: new RegExp('^\/' + langs[i].abbrev)
    });
    nav['lang/'+langs[i].abbrev] = [
      {title: langs[i].menu.home, path: '/lang/' + langs[i].abbrev + '/'},
      {title: langs[i].menu.api, type: 'dropdown', items: items[i]},
      {title: 'ChangeLog', path: '/changelog', matchPath: /^\/(changelog)/},
      {title: i, type: 'dropdown', items: dropDownItems}      
    ];
  }
});

nav['default'] = [
  {title: 'はじめに', path: '/'},
  {title: 'API説明書', type: 'dropdown', items: items['日本語']},
  {title: 'ChangeLog', path: '/changelog', matchPath: /^\/(changelog)/},
  {title: '日本語', type: 'dropdown', items: dropDownItems}
];

nav['lang/en'] = [
  {title: 'Home', path: '/lang/en/'},
  {title: 'API Instructons', type: 'dropdown', items: items['English']},
  {title: 'ChangeLog', path: '/changelog', matchPath: /^\/(changelog)/},
  {title: 'English', type: 'dropdown', items: dropDownItems}
];

docute.init({
  repo: 'every-sense/everysense_api_doc',
  tocVisibleDepth: 4,
  debug: false,
  sidebar: true,
  'edit-link': 'https://github.com/every-sense/everysense_api_doc/tree/master/docs/',
  nav: nav,
});
