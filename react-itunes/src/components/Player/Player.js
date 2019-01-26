import React, { Component } from 'react'
import './Player.scss'

class Player extends Component {
    static defaultProps = {
        musicLink: '',
        idA: ''
    }

    constructor(props) {
        super(props);


        this.state = {
            playerId: this.props.idA + this.guidGenerator(),
            seekId: this.props.idA + this.guidGenerator(),
            endId: this.props.idA + this.guidGenerator(),
            startId: this.props.idA + this.guidGenerator()
        }
                
        this.Play = this.Play.bind(this);
        this.Pause = this.Pause.bind(this);
        this.InitPlayer = this.InitPlayer.bind(this);
        this.calculateCurrentValue = this.calculateCurrentValue.bind(this);
        this.calculateTotalValue = this.calculateTotalValue.bind(this);
        this.guidGenerator = this.guidGenerator.bind(this);
    }

    guidGenerator() {
        let S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    Play() {
        document.getElementById(this.state.playerId).play();
    }

    Pause() {
        document.getElementById(this.state.playerId).pause();
    }

    InitPlayer() {
        let player = document.getElementById(this.state.playerId);
        let length = player.duration
        let current_time = player.currentTime;
      
        let totalLength = this.calculateTotalValue(length)
        document.getElementById(this.state.endId).innerHTML = totalLength;

        let currentTime = this.calculateCurrentValue(current_time);
        document.getElementById(this.state.startId).innerHTML = currentTime;
      
        let progressbar = document.getElementById(this.state.seekId);
        progressbar.value = (player.currentTime / player.duration);
        progressbar.addEventListener("click", seek);

        function seek(event) {
            let percent = event.offsetX / this.offsetWidth;
            player.currentTime = percent * player.duration;
            progressbar.value = percent / 100;
          }
    }

    calculateTotalValue(length) {
        let minutes = Math.floor(length / 60),
          seconds_int = length - minutes * 60,
          seconds_str = seconds_int.toString(),
          seconds = seconds_str.substr(0, 2),
          time = minutes + ':' + seconds
      
        return time;
      }
      
      calculateCurrentValue(currentTime) {
        let current_hour = parseInt(currentTime / 3600) % 24,
          current_minute = parseInt(currentTime / 60) % 60,
          current_seconds_long = currentTime % 60,
          current_seconds = current_seconds_long.toFixed(),
          current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
      
        return current_time;
      }


    render() {
        return (
            <div>
                <audio onTimeUpdate={this.InitPlayer} id={this.state.playerId} controls hidden>  
                    <source src={this.props.musicLink} type="audio/mpeg"/>                    
                </audio>
                <span id={this.state.startId}></span> - <span id={this.state.endId}></span> <br/>
                <button className="button" onClick={this.Play}>Play</button>
                <button className="button" onClick={this.Pause}>Pause</button>
                <progress className="progress" id={this.state.seekId} value="0" max="1"></progress>
            </div>
        )
    }

}

export default Player;