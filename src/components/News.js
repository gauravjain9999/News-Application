import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from "./Spinner";
import InfiniteScroll  from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string   
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(pageNo){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q&page=${
    this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    this.props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log('Parsed Data', parseData);
    this.setState({ articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      isShownNextBtn: false,
      isShownPrevBtn: false
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`
    console.log('Helo constructor', this.state);
  }

  //It Works After Render
  async componentDidMount() {
    this.updateNews()
    // console.log('Component Did Mount');
    // let url =
    // `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // });
    console.log('ComponentDIDMount', this.state);
  }

  //  checkDuplicate = async(url, event) =>{
  //    let data = await fetch(url);
  //    let parseData = await data.json();

  //   if(event === 'next'){
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading: false,
  //       isShownNextBtn: false
  //     });
  //   } else{
  //     this.setState({
  //       page: this.state.page - 1,
  //       articles: parseData.articles,
  //       isShownNextBtn: false,
  //       loading: false
  //     });
  //   }
  // }

  // checkIsNextPage = async(totalResult, url, event) =>{
  //   let result = Math.ceil((totalResult)/this.props.pageSize);
  //   this.setState({loading: true});
  //   if((this.state.page + 1 > result && event === 'next')){
  //     this.setState({
  //       isShownNextBtn: true,
  //       isShownPrevBtn: false,
  //       loading: false
  //     });  
  //     console.log('ander aa raha h with state', this.state);
  //   }
  //   else{
  //     this.checkDuplicate(url, 'next');
  //   }
  // }

  handleNextPage = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.checkIsNextPage(this.state.totalResults, url, 'next');
    this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  handlePreviousPage = async () => {
    // if(this.state.page >= 1 && this.state.page !== 0){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q&page=${
    //     this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   this.checkDuplicate(url, 'prev');
    // }else{
    //   this.setState({
    //     page: 1,
    //     isShownPrevBtn: true,
    //     loading: false
    //   })
    // }
    this.setState({page: this.state.page - 1})
    this.updateNews();
  };

  fetchMoreData = async () =>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q&page=${
    this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    });
    
    // this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '40px'}} >NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
         {this.state.loading && <Spinner />}
          {/* <InfiniteScroll 
            dataLength={this.state.articles.length}
            next= {this.fetchMoreData}
            hasMore = {this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          > 
         {/* <div className="container">
          
         </div> */}
        {/* </InfiniteScroll> */} 
          <div className='row'>
          {this.state.articles.map((element) => {
            //Key Uniquely Define Every Object
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  author={element.author} source={element.source.name} date={element.publishedAt}  description={
                    element.description ? element.description.slice(0, 88) : ''
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  />
              </div>
            );
          })}
           </div>
        
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button className='btn btn-secondary me-md-2' type='button' disabled={this.state.isShownPrevBtn}
              onClick={this.handlePreviousPage}>&laquo; Previous
            </button>
            <button className='btn btn-primary' type='button' disabled={this.state.isShownNextBtn}
              onClick={this.handleNextPage}>Next &raquo;
            </button>
          </div>
        </div>
    );
  }
}
