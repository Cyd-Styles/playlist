
const Playlist = [
  { id:1, name: 'Lucid Dreams', url : 'https://www.youtube.com/watch?v=mzB1VGEGcSU' , thumbnail : 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Juice_WRLD_Lucid_Dreams.png/220px-Juice_WRLD_Lucid_Dreams.png'},
  { id:2, name: 'I Fall Apart', url : 'https://www.youtube.com/watch?v=7a66clRobKI' , thumbnail : 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Stoneyalbum.jpg/220px-Stoneyalbum.jpg'},
  { id:3, name: 'Wolves', url : "https://www.youtube.com/watch?v=cH4E_t3m3xM", thumbnail : 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Selena_Gomez_and_Marshmello_Wolves.jpg/220px-Selena_Gomez_and_Marshmello_Wolves.jpg'},
  { id:4, name: 'Yes Indeed', url : "https://www.youtube.com/watch?v=AbEHRrq7xwU" , thumbnail : 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Yes_Indeed.jpg/220px-Yes_Indeed.jpg'}
]
/**
 * Gets the browser name or returns an empty string if unknown. 
 * This function also caches the result to provide for any 
 * future calls this function has.
 *
 * @returns {string}
 */
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        isBlink ? 'Blink' :
        "Don't know";
};
var br=browser();
console.log(browser());
class AudioPlayer extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = { urlIndex : 0 , toggle : false}
    this.scrolling=this.scrolling.bind(this);
    this.menuToggle=this.menuToggle.bind(this);
    this.updateSong=this.updateSong.bind(this);
  }
  scrolling = () =>{
    var track=document.getElementById("scroll-text");
    var val = track.getPropertyValue('left');
    console.log(track);
  }
  // componentDidMount() {
  //   setInterval(this.scrolling,500);
  // }
  menuToggle = (event) => {
    this.state.toggle === false ?
      this.setState({toggle : true}) :
    this.setState({toggle : false})
  }
  updateSong = (event) => {
    var n=0;
    var song = document.getElementById("audio-player");
    var len = event.target.innerHTML.length;
    var trackName = event.target.innerHTML.slice(1,len);
    for(let i =0 ; i< Playlist.length ; i++) {
      if(Playlist[i].name===trackName) {
        n = Playlist[i].id;
        break;
      }
    }
    console.log(trackName);
    this.setState({urlIndex : n-1})
    setTimeout(() => {
        song.load();
        song.play();
      },100)
  }
  

  prevHandler =(event) => {
    var song = document.getElementById("audio-player");
    console.log("prev");
    if(this.state.urlIndex == 0) {
      this.setState({urlIndex : Playlist.length-1})
      setTimeout(() => {
        song.load();
        song.play();
      },100)
    }
    else {
      this.setState((prevState) => ({
      urlIndex : (prevState.urlIndex-1)%Playlist.length
    }));      
      setTimeout(() => {
        song.load();
        song.play();
      },100)
    }
  }
  
  nextHandler =(event) => {
    var song = document.getElementById("audio-player");
    console.log("next");
    this.setState((prevState) => ({
      urlIndex : (prevState.urlIndex+1)%Playlist.length
    }))
    setTimeout(() => {
        song.load();
        song.play();
      },100)
    
  }
  render() {
    const trackListName = Playlist.map((n,index) => 
    <li onClick={this.updateSong} key={n.name}> {
                                           this.state.urlIndex===index ? <marquee behavior="scroll" direction="left"><b>{n.name}</b></marquee> : n.name  }
                                       </li>)
    console.log("index " + this.state.urlIndex);
    const song=Playlist[this.state.urlIndex].url;
    const trackname = Playlist[this.state.urlIndex].name;
    /*src=audioURL[this.state.urlIndex]*/
    var styleButton=null;
    if(br==='Chrome') {
      styleButton ={ background : '#f2f2f2' , color : 'grey' , height : '32px' };
    }
    else{
      styleButton ={ background : '#474747' , color : 'white' , height : '40px' };
    }
    return (
      <div id="player-container">

        <img id="thumbnail" src={Playlist[this.state.urlIndex].thumbnail} />
        <div id="current-track">
          { this.state.toggle ===true ?<marquee> {trackname} </marquee> : null } 
        </div>
        <div id="audio-box">
          <audio controls id="audio-player">
            <source src= {song}/>
          </audio>
          
          
          <div id="prev-mp3" style={{background : styleButton.background , color : styleButton.color , height:styleButton.height , font : styleButton.fontsize}} onClick={this.prevHandler}>&laquo;</div>
          <div id="next-mp3" style={{background : styleButton.background , color : styleButton.color , height:styleButton.height , font : styleButton.fontsize}} onClick={this.nextHandler}>&raquo;</div>
          <div id="menu-toggle" style={{background : styleButton.background , color : styleButton.color , height:styleButton.height , font : styleButton.fontsize}} onClick={this.menuToggle}>&#9776;</div>
        </div>
        {
          this.state.toggle === false ?
            <ul>
          {trackListName}
        </ul> :
          null
        }
        
        
        
      </div>
    )
  }
}

const element=<AudioPlayer />
      ReactDOM.render(
        element, document.getElementById('root'));