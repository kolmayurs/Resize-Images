import React, { Component } from 'react';
import './App.css';
import html2canvas from 'html2canvas';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={file: '',
              imagePreviewUrl: '',
              width:600}
    this.fileHandler =this.fileHandler.bind(this);
    this.downloadImage =this.downloadImage.bind(this);
  }
  fileHandler(e){  
    e.preventDefault();
    let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
              this.setState({
                file: file,
                imagePreviewUrl: reader.result
              });
            }

            reader.readAsDataURL(file);
  }

   downloadImage(){
     let memeImage = document.querySelector('#meme');
     html2canvas(memeImage).then(canvas => {
     let imgData = canvas.toDataURL("image/*");
     console.log(imgData);
     let link = document.createElement("a");
     link.href = imgData;
     let imageStr = this.state.file.name.replace(' ','_');
    link.download = imageStr.toLowerCase();
    link.click();
    //document.write("<img src="+link+" />");
    /*var img = document.createElement("img");
img.src = imgData;
document.write(img);*/
});

}

  render() {
    let uploadImage = <img src={this.state.imagePreviewUrl} id="input-image" alt="123" style={{display:'none'}} />
    if(this.state.imagePreviewUrl === ''){
      uploadImage = <img src={this.state.imagePreviewUrl} id="input-image" alt="123" style={{display:'none'}} />
    }
    else{
      uploadImage = <img src={this.state.imagePreviewUrl} alt={this.state.file.name} id="input-image"  style={{display:'block', width: '100%', margin: '0 auto'}} />
    }
     return (
      <div className="App">
        <h1>Resize Images</h1>
        Select Image: <input type="file" onChange={this.fileHandler.bind(this)} accept="image/*"/>
        <br /><br />
        Enter Width: <input type="text" value={this.state.width} Placeholder="Enter Width here" onChange={e => {this.setState({width: e.target.value})}} /> px
        <br /><br />
        <button onClick={this.downloadImage}>Download</button>
        <br /><br />
        <div className="container" id="meme" style={{maxWidth: this.state.width + 'px'}}>
          {uploadImage}
        </div>
      </div>
    );
  }
}

export default App;
