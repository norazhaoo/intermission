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
    'pages/shows-new/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff9ed',
    navigationBarTitleText: 'The Playbill',
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
        text: 'GALLERY'
      },
      {
        pagePath: 'pages/tickets/index',
        text: 'TICKETS'
      },
      {
        pagePath: 'pages/seats/index',
        text: 'SEATS'
      },
      {
        pagePath: 'pages/shows/index',
        text: 'SHOWS'
      },
      {
        pagePath: 'pages/calendar/index',
        text: 'CALENDAR'
      }
    ]
  }
})
