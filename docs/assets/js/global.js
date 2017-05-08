const pages = [
  'auth', 'session', 'message', 'order', 'device', 'sensor', 'farm',
  'farmowner', 'owner', 'autoaccept', 'notification', 'output',
];

var langs = {
  'English': {
    enabled: true,
    abbrev: 'en',
    menu: {
      home: 'Home',
      api: 'API Instructons'
    },
    pages: {
      auth: 'Auth',
      session: 'Session',
      message: 'Message',
      order: 'Order',
      device: 'Device',
      sensor: 'Sensor',
      farm: 'Farm',
      farmowner: 'Farm Owner',
      owner: 'Owner',
      autoaccept: 'Autoaccept',
      notification: 'Notification',
      output: 'Output',
    }
  },
  '日本語': {
    enabled: true,
    abbrev: 'ja',
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
  }
};

var dropDownItems = [
  {title: '日本語', path:'/', matchPath: /^\//},
  {title: 'English', path: '/lang/en/', matchPath: /^\/en/},
];

