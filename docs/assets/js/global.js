var langs = {
  '日本語': {
    abbrev: 'ja',
    path: 'lang/ja',
    menu: {
      home: 'はじめに',
      api: 'API説明書'
    },
    pages: {
      auth: '認証',
      session: 'セッション',
      message: 'メッセージルータ',
      order: 'オーダー',
      device: 'デバイス',
      sensor: 'センサー',
      farm: 'ファーム',
      farmowner: 'ファームオーナ',
      owner: 'オーナ',
      autoaccept: '自動承認',
      notification: '通知',
      output: 'データ出力',
    }
  },
  'English': {
    enabled: true,
    abbrev: 'en',
    path: 'lang/en',
    pages: {
      auth: 'auth',
      session: 'session',
      message: 'message',
      order: 'order',
      device: 'device',
      sensor: 'sensor',
      farm: 'farm',
      farmowner: 'farmowner',
      owner: 'owner',
      autoaccept: 'autoaccept',
      notification: 'notification',
      output: 'output',
    }
  }
};

var langItems = [
  {title: '日本語', path:'/', matchPath: /^\//},
  {title: 'English', path: '/lang/en/', matchPath: /^\/en/}
];

const pages = [
  'auth', 'session', 'message', 'order', 'device', 'sensor', 'farm',
  'farmowner', 'owner', 'autoaccept', 'notification', 'output',
];


// var ja_pages = [
//   {title: '認証', path: '/lang/ja/auth', matchPath: /^\/(auth|auths)/},
//   {title: 'セッション', path: '/lang/ja/session', matchPath: /^\/(session|sessions)/},
//   {title: 'メッセージルータ', path: '/lang/ja/message', matchPath: /^\/(message|messages)/},
//   {title: 'オーダー', path: '/lang/ja/order', matchPath: /^\/(order|orders)/},
//   {title: 'デバイス', path: '/lang/ja/device', matchPath: /^\/(device|devices)/},
//   {title: 'センサー', path: '/lang/ja/sensor', matchPath: /^\/(sensor|sensors)/},
//   {title: 'ファーム', path: '/lang/ja/farm', matchPath: /^\/(farm|farms)/},
//   {title: 'ファームオーナ', path: '/lang/ja/farmowner', matchPath: /^\/(farmowner|farmowners)/},
//   {title: 'オーナ', path: '/lang/ja/owner', matchPath: /^\/(owner|owners)/},
//   {title: '自動承認', path: '/lang/ja/autoaccept', matchPath: /^\/(autoaccept|autoaccepts)/},
//   {title: '通知', path: '/lang/ja/notification', matchPath: /^\/(notification|notifications)/},
//   {title: 'データ出力', path: '/lang/ja/output', matchPath: /^\/(output|outputs|dataoutput|dataoutputs)/},
// ];
