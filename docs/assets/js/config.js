var langs = [
  {title: '日本語', path:'/', matchPath: /^\/(home)/},
  {title: 'English', path: '/lang/en/', matchPath: /^\/en/}
];

docute.init({
  repo: 'every-sense/UserDocument',
  tocVisibleDepth: 4,
  debug: true,
  sidebar: true,
  'edit-link': 'https://github.com/daiyanze/everysense_api_doc/tree/master/docs/',
  nav: {
    default: [
      {title: 'API説明書', path: '/'},
      {title: '変更履歴', path: '/changelog'},
      {title: '日本語', type: 'dropdown', items: langs}
    ],
    'lang/en': [
      {title: 'API Reference', path: '/lang/en/'},
      {title: 'ChangeLog', path: '/changelog'},
      {title: 'English', type: 'dropdown', items: langs}
    ]
  }
})