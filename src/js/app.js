import T7 from 'template7';
import Framework7 from 'framework7';

// import F7 components
import Tabs from 'framework7/components/tabs/tabs.js';
import Toolbar from 'framework7/components/toolbar/toolbar.js';
import Infinitescroll from 'framework7/components/infinite-scroll/infinite-scroll.js';

// Install F7 Components
Framework7.use([Tabs, Toolbar, Infinitescroll]);

// Template7 helpers
T7.registerHelper('pluralize', function (arr, options) {
  if (!arr) return '';
  if (typeof arr === "number") return (arr < 2) ? options.hash.single : options.hash.multiple;
  return (arr.length === 1) ? options.hash.single : arr.length + " " + options.hash.multiple;
});
// Template 7 Register partial
T7.registerPartial(
  'comments',
  '{{#each comments}}' +
      '<div class="message message-first message-last message-tail{{#js_if "@index%2 === 0"}} message-sent{{else}} message-received{{/js_if}}">' +
          '<div class="message-content">' +
              '<div class="message-name">{{user}}, {{time_ago}}</div>' +
              '<div class="message-bubble">' +
                  '<div class="message-text">{{content}}</div>' +
              '</div>' +
          '</div>' +
      '</div>' +
      '{{#if comments}}{{> "comments"}}{{/if}}' +
  '{{/each}}'
);

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import Routes
import routes from './routes.js';

var app = new Framework7({
  root: '#app', // App root element

  name: 'hackernews7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data() {
    return {
        apiUrl: "https://api.hnpwa.com/v0/",
        api: null
    }
  },
  // App root methods
  methods: {
    fetchAPI() {
      var self = this;
      self.request.json(self.data.apiUrl, (api) => {
          self.data.api = api
      })
    },
  },
  // App routes
  routes: routes,

  // Register service worker
  serviceWorker: {
    path: '/HackerNews7/service-worker.js',
  },
});