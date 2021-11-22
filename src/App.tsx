import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/app.css';
import axios from 'axios';
import { setInterval } from 'timers';



function App() {

  /*var els = document.getElementsByClassName('imgSelect');
  function _removeClasses() {
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('selected')
    }
  }*/

  setInterval(function (e) {
//    _removeClasses();
    axios.get('http://localhost:5000/result', {})
      .then(function (response) {
        try {
          switch (response.data.result) {
            case 'right':
              document.getElementById('rightİmage')?.classList.add('selected');
              document.getElementById('leftİmage')?.classList.remove('selected');
              break;
            case 'left':
              document.getElementById('leftİmage')?.classList.add('selected');
              document.getElementById('rightİmage')?.classList.remove('selected');
              break;

            default:
              document.getElementById('rightİmage')?.classList.remove('selected');
              document.getElementById('leftİmage')?.classList.remove('selected');
              break;
          }
        } catch (error) {

        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }, 1500);

  return (
    <div id="app" className="container">
      <div className="header">
        <h2 className="text-center">
          Eye Tracker
        </h2>
      </div>
      <div className="body">
        <img id="leftİmage" className="imgSelect" src="https://www.cafemarkt.com/gastrocups-casablanca-bardak-250-ml-polikarbonat-seffaf-kirilmaz-su-ve-mesrubat-bardaklari-gastrocups-32693-18-B.jpg" alt="" />
        <img id="rightİmage" className="imgSelect" src="https://www.cafemarkt.com/gastrocups-casablanca-bardak-250-ml-polikarbonat-seffaf-kirilmaz-su-ve-mesrubat-bardaklari-gastrocups-32693-18-B.jpg" alt="" />
      </div>
    </div>
  );

}
export default App;
