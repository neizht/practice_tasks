import './MyAppStyle.css';
import React from 'react';
import data from '../movies.json';

export default class MyApp extends React.Component {

    state = {
        btnClicked: false,
    }

    selectedMovieId = null;

    render() {
        return (
            <div className="container" onLoad={() => {
                    setRandomRating()
                    this.forceUpdate();
                }}>
                <ul className='myMoviesList'>
                    {reorderArr(data.movies).map(el => <li key={el.id}>
                        <img src={el.photoUrl} alt="" width={200}/>
                        <h1>{`${el.name} (${el.year})`}</h1>
                        <div className="rate">
                            <h1 style={{fontSize:'13px'}}>current rating: {el.rating}/10 <button onClick={() => {
                                document.querySelector('.myMoviesList').style.filter = 'blur(10px)';
                                document.querySelector('.myMoviesList').style.cursor = 'not-allowed';
                                document.querySelector('.inputRating').style.display = 'block';
                                console.log(el.id);
                                this.selectedMovieId = el.id;
                            }}>change</button></h1> 
                        </div>
                    </li>)}   
                </ul>
                <div className="inputRating">
                    <input type="number" name="inputYourRating" id="inputYourRating-id" placeholder='input a number 1-10' style={{fontSize:'19px', width:'200px', padding:'5px'}}/>
                    <input type="submit" value="Set" style={{fontSize:'19px', width:'100px', padding:'5px'}} onClick={() => {
                        console.log(this.selectedMovieId);
                        for(let i = 0; i <= data.movies.length; i++){
                            if(data.movies[i].id == this.selectedMovieId){
                                data.movies[i].rating = document.querySelector('#inputYourRating-id').value;
                                document.querySelector('#inputYourRating-id').value = null;
                                document.querySelector('.myMoviesList').style.filter = 'none';
                                document.querySelector('.myMoviesList').style.cursor = 'default';
                                document.querySelector('.inputRating').style.display = 'none';
                                this.forceUpdate();
                                return;
                            }
                        }
                    }}/>
                </div>
                <button onClick={() => {
                    if(this.state.btnClicked){
                        console.log('deactivating...');
                        this.setState({
                            btnClicked: false
                        })
                        return;
                    }
                    console.log('activating...');
                    let myInterval = setInterval(() => {
                        if(!this.state.btnClicked){
                            clearInterval(myInterval);
                            return;
                        }
                        setRandomRatingForRandomItem();
                        this.forceUpdate();
                    }, 2000)
                    this.setState({
                        btnClicked: true
                    })
                }}>RANDOM RATING</button>
            </div>
        )
    }
}

const setRandomRatingForRandomItem = () => {
    data.movies[Math.floor(Math.random() * data.movies.length)].rating = Math.floor(Math.random() * (10) + 1);
}

const setRandomRating = () => {
    for(let i = 0; i < data.movies.length; i++){
        data.movies[i].rating = Math.floor(Math.random() * (10) + 1);
    }
}
const reorderArr = (array) => {
    return ([...array].sort((a,b) => b.rating - a.rating));
}