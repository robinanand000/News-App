import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';

export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:9,
    category:"general",
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading: false,
      page:1
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)} -NewsMonkey`;
  }
  
async updateNews(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=063a20a3197648538a1302df80bca019&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    })
}
 async  componentDidMount(){
  this.updateNews();
  }

  handleNextClick= async()=>{
    this.setState({page:this.state.page+1})
    this.updateNews();
  }

  handlePrevClick= async()=>{
    this.setState({page:this.state.page-1})
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
          <h2>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h2>
          {this.state.loading &&<Spinner/>}

          <div className="row ">
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem date={element.publishedAt} title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} source={element.source.name}/>
              </div>
            })}
          </div>

          {!this.state.loading &&<div className="container d-flex justify-content-evenly my-4">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>}
      </div>
    )
  }
}

export default News
