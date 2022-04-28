import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dictionary from './dictionary.json';
import hammy from './hamlet_words.json'
const ham = json2array(hammy)
const dictty = json2array(dictionary)
var ham_cnt = ham.length


function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz git p"
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(key);
  });
  return result;
}

function Letters(props){
  var colour = {color:'red'}
  if(props.isWord){
    colour = {color:'green'}
  }
  
  return <p class = 'dawords' style = {colour}>{props.letter}</p>
}

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"
  
  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}



class Monkey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {letters: [], isToggleOn: true, foundWords:[]};
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  checkForWord(){
    var retVal = 10;
    if(this.state.letters.length <10){
      retVal = this.state.letters.length
    }
    
    for(var i = 0; i<retVal; i=i+1){
      var word = ""
      for(var j = this.state.letters.length-1; j>this.state.letters.length-i;j--){
        word += this.state.letters[j].props.letter
      }
      word = reverseString(word)
      if(dictty.includes(word) && word.length >= 3){
        
        var yuh = this.state.foundWords
        yuh.push(<p>{word}</p>)
        this.setState(prevState => ({foundWords: yuh}))
        console.log(this.state.foundWords)
        //console.log(this.state.letters.length-i)
        var temp = this.state.letters
        for(var k = this.state.letters.length-i+1; k < this.state.letters.length; k++){
          //this.state.letters[k].props.color = 'green'
          
          temp[k] = <Letters color = {"green"} letter = {this.state.letters[k].props.letter} isWord = {true}/>
          this.setState(prevState => ({letters: temp}))
        }
      }
    } 
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClick() {
    this.checkForWord()
    var temp = this.state.letters
    var letty = generateRandomLetter()
    temp.push(<Letters color = {"blue"} letter = {letty} isWord = {false}/>)
    this.setState(prevState => ({
      letters: temp
    }));
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const items = []
    for(var i=0;i<this.state.letters.length; i++){
      items.push(this.state.letters[i])
    }
    return (
      
      <div> 
        <div class = 'container-words'>
          <p class = 'written-font'>{this.state.foundWords}</p>
        </div>

        <div class = "container">
<<<<<<< HEAD
          <p class='title-card'>Monkey Typewriter</p>
=======
          <p class = 'title-card'>Monkey Typewriter</p>
>>>>>>> 372b45f52d47c3198779ae313e883aa6a99ed566
          <img onClick={this.handleClick} class='run-monkey' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/063a0654-488d-4258-a226-18f58d51883d/de34gu9-477ecfbf-cf54-4e67-9be1-df9de14e7977.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA2M2EwNjU0LTQ4OGQtNDI1OC1hMjI2LTE4ZjU4ZDUxODgzZFwvZGUzNGd1OS00NzdlY2ZiZi1jZjU0LTRlNjctOWJlMS1kZjlkZTE0ZTc5NzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PuxnaBZFr2hTGTXxVd8G_n8-e8geyyqU7gWo3aGwp-0"></img>
        </div> 
        <div class='display-linebreak'>
            {items}
        </div>
        <div class = 'ham-style'>

          <p>{"# of Hamlet Words Remaining"}</p>
          <p class = 'ham-number'>{ham_cnt}</p>
        </div>
        
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Monkey />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
