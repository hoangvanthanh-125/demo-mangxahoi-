import firebase from 'firebase'
export const AsyncUser = async () => {
  return new Promise((resolve,rejsect) => {
    var timeOut = setTimeout(() => {
      rejsect('loi');
    },100000)
    firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
   resolve('ko loi');
   clearTimeout(timeOut);
   }
   //else rejsect('loi')
  }) 
  })
}


