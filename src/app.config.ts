export default defineAppConfig({
  pages: [
    'pages/loading/index',
    'pages/gallery/index',
    'pages/tickets/index',
    'pages/seats/index',
    'pages/shows/index',
    'pages/calendar/index',
    'pages/gallery-review-new/index',
    'pages/tickets-add/index',
    'pages/tickets-list/index',
    'pages/shows-detail/index',
    'pages/shows-new/index',
    'pages/seats-add/index',
    'pages/seats-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff9ed',
    navigationBarTitleText: '剧目手帐',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff9ed'
  },
  tabBar: {
    custom: true,
    color: '#8b716f',
    selectedColor: '#5d000a',
    backgroundColor: '#fff9ed',
    list: [
      {
        pagePath: 'pages/gallery/index',
        text: '画廊'
      },
      {
        pagePath: 'pages/tickets/index',
        text: '票根'
      },
      {
        pagePath: 'pages/seats/index',
        text: '座位'
      },
      {
        pagePath: 'pages/shows/index',
        text: '剧目'
      },
      {
        pagePath: 'pages/calendar/index',
        text: '日历'
      }
    ]
  }
})
