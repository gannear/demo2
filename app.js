import React , {Component} from 'react';
import jsPDF from 'jspdf';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      commits: [],
      pulls: [],
      showCommits: false,
      showPulls: false,
    }
  }

  getCommitsData = async () => {
    const url = "https://api.github.com/repos/gannear/demo2/commits"
    const response = await fetch(url, {
        "method": "GET",
    })
    const result = await response.json()
    this.setState(
      {
        commits: result,
        showCommits: true,
        showPulls: false,
      }
    )
    var doc = new jsPDF('p','pt');
    doc.text(30,20,"Commits are :: ");
    var y = 40;
     for(var i=0; i<this.state.commits.length;i++){
      doc.text(30, y, this.state.commits[i].commit.message);
      y=y+20;
     } 
   doc.save("commits.pdf");
}

getPullsData = async () => {
  const url = "https://api.github.com/repos/gannear/demo2/pulls"
  const response = await fetch(url, {
      "method": "GET"
  })
  const result = await response.json()
  this.setState(
    {
      pulls: result,
      showPulls: true,
      showCommits: false,
    }
  )
  var doc = new jsPDF('p','pt');
    doc.text(30,20,"Pulls are :: ");
    var y = 40;
    for(var i=0; i<this.state.pulls.length;i++){
      doc.text(30, y, this.state.pulls[i].body);
      y=y+20;
     } 
   doc.save("pulls_Data.pdf");
}

  render(){
    const { showCommits, showPulls } = this.state;
    let btnStyle = {
      background: '#008000',
      borderRadius: 8,
      color: 'white',
      marginTop:20,
      width:200,
      height:50,
      marginRight:30
    }
   return(
      <div className="App">
        <h2>Fetching Data of commits and Pulls request using github api</h2>
        <button style={btnStyle} onClick={this.getCommitsData}>Export Commits Data To PDF</button>
        <button style={btnStyle} onClick={this.getPullsData}>Export Pulls Data TO PDF</button>
         <div>
          {showCommits && this.state.commits.map((data, index) => (
            <ul key={index}>
              <li>
                {data.commit.message}
              </li>
            </ul>
          ))}
          {showPulls && this.state.pulls.map((data, index) => (
            <ul key={index}>
              <li>
                {data.body}
              </li>
            </ul>
          ))}
        </div>
      </div>
      )
  }
 }
export default App;
