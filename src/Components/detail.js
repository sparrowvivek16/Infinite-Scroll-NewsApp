import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GLOB_VAR, BASE_URL } from '../Common/app-constants';
import axios from 'axios';
import nullImg from '../assets/img/img-missing.png'; 

class Detail extends Component{
    state={
        detailArticle: null
    }
    componentDidMount(){
        
        let tt = this.props.match.params.title_text;        
        let query= `?qInTitle=${tt}&apiKey=${GLOB_VAR.API_KEY}`;
        axios.get(BASE_URL+query).then(res=>{           
            this.setState({
                detailArticle: res.data.articles
            });
        }).catch(err=>console.log(err));
    }
    formateDate(dat){
        const d = new Date(dat);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return(`${da}-${mo}-${ye}`);
    }

    render(){
        const {detailArticle} = this.state;
        const newsDetails = this.state.detailArticle ? (<>            
            <img className="responsive-img" src={detailArticle[0].urlToImage!==null ? detailArticle[0].urlToImage : nullImg } width="100%" alt="coverImg"/>
            <h5>{this.formateDate(detailArticle[0].publishedAt)}</h5>
                <h1>{detailArticle[0].title}</h1>
                <p>{detailArticle[0].content}</p>
            <div className="right-align">
                <a href={detailArticle[0].url} >Source: Full article <i class="fa fa-info" aria-hidden="true"></i></a>
            </div>
            <footer>
                <div className="center-align"><p>Copyright @ 2020</p></div>
            </footer>
            </>
        ) : (
            <div className="center-align"><div class="loadingio-spinner-spinner-jkhxxb95hai"><div class="ldio-bxyg74apiwl">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
            </div>
        );
        return(<>
            <div className="navbar-fixed">
                <nav className="nav-wrapper blue darken-3">
                    <div className="container">
                        <Link className="brand-logo" to="/">News | aTeam</Link>
                    </div>
                </nav>
            </div>
            <div className="container">
            {newsDetails}            
            </div>
        </>);
    }
}

export default Detail;