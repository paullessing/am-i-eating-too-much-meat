// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAgjogKNRoML9DugYwZ3tP5f8rIl7cQqu4',
    authDomain: 'am-i-eating-too-much-meat.firebaseapp.com',
    databaseURL: 'https://am-i-eating-too-much-meat.firebaseio.com',
    projectId: 'am-i-eating-too-much-meat',
    storageBucket: 'am-i-eating-too-much-meat.appspot.com',
    messagingSenderId: '3038185325',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
