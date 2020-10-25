import React, { Component } from 'react';
import { Slide, Slider, Tabs, Tab } from 'react-materialize';
import { GLOB_VAR, BASE_URL } from '../Common/app-constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import nullImg from '../assets/img/img-missing.png'; 
import homeSplash from '../assets/img/home-splash.jpg'; 
import { Link } from 'react-router-dom';


class Home extends Component{
    state={
        articles:[],
        hasMore: true,
        totalResults: 200,
        pageCount: 20
        
    }
    componentDidMount(){
        //populate the first tab with data on component mount
        this.getNews('entertainment');
    }
    //get the first set of news
    getNews = (q) =>{
        //set state to fetch the first page and rest the article to empty
        this.setState({
            ...this.state,
            articles: [],
            page: 1,
            q
            
        }); 
        //create query based on tab
        let query= `?q=${q}&page=${this.state.page}&pageSize=20&apiKey=${GLOB_VAR.API_KEY}`;
        //make a API request and fetch the data
        axios.get(BASE_URL+query).then(res=>{           
            this.setState({
                ...this.state,
                articles: res.data.articles,
                totalResults: res.data.totalResults,
                page:2, 
                pageCount:40
                
            });            
        }).catch(err=>console.log(err));;
    }
    //activates when infinite scrolling beings
    getMoreNews = () =>{       
        //check if the scroll has reached end of data
        if (this.state.pageCount >= this.state.totalResults ) {
            this.setState({ hasMore: false, message: 'End of data' });
            return;
          }
        let query= `?q=${this.state.q}&page=${this.state.page}&pageSize=20&apiKey=${GLOB_VAR.API_KEY}`;
        //make a API request and fetch the data inc page number and count
        axios.get(BASE_URL+query).then(res=>{            
            this.setState({
                ...this.state,
                articles: this.state.articles.concat(res.data.articles),
                page: this.state.page+1,
                pageCount: this.state.pageCount+20
            });
        }).catch(err=> {
            //message to show API limit has reached
            if(err.response.status === 426){
                this.setState({ hasMore: false, message: 'API limit reached' });
                return;
            }
        });

    }
    render(){
        return(<>
        <div className="navbar-fixed">
        <nav className="nav-wrapper blue darken-3">
            <div className="container">
                <Link className="brand-logo" to="/">News | aTeam</Link>
            </div>
        </nav>
        </div>
        <div className="container home">
        <Slider fullscreen={false} options={{indicators: false }}>
            <Slide image={<img alt="" src={homeSplash}/>}>
            </Slide>
        </Slider>
                <Tabs className="tab-news white-text blue  z-depth-1" 
                      onChange={val=> this.getNews(val.target.innerText.toLowerCase())}>
                    <Tab title="Entertainment" >
            {this.state.q==='entertainment' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>    
                        }               
                    </Tab>
                    <Tab title="General">
                    {this.state.q==='general' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                    </Tab>
                    <Tab title="Health">
                    {this.state.q==='health' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                     }
                    </Tab>
                    <Tab title="Science">
                    {this.state.q==='science' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                    </Tab>
                    <Tab title="Sports">
                    {this.state.q==='sports' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                        }
                    </Tab>
                    <Tab title="Technology">
                    {this.state.q==='technology' &&
                        <InfiniteScroll
                            dataLength={this.state.pageCount}
                            next={this.getMoreNews}
                            hasMore={this.state.hasMore}
                            loader={<div className="center-align"><div className="loadingio-spinner-spinner-jkhxxb95hai"><div className="ldio-bxyg74apiwl">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div></div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>{this.state.message}</b>
                                </p>
                            }>
                            {this.state.articles.map((i, index) => (
                                <div className="post card" key={index}>
                                    <img src={i.urlToImage!==null ? i.urlToImage : nullImg } alt="Thumbnail" />
                                    <div className="card-content">
                                    <span className="card-title"><strong>{i.title.replace('%',"")}</strong></span>
                                    <p>{i.description.replace('%',"")}</p>
                                    <div className="right-align"><Link  to={"/"+i.title.replace('%',"")} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></Link></div>
                                    
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                    </Tab>
                </Tabs>
        </div>
        </>
    );
    }

}

export default Home;