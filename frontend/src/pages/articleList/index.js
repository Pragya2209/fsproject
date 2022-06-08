import React, { useState, useEffect } from "react";

import Header from "./header";
import FilterSearch from "./filter-search";
import ArticleList from './list';

import "../../styles/article.css";

import { getArticleList } from '../../services/api';

function Article() {
  const [articles, setArticles] = useState([])
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(0);
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    fetchList();
    window.addEventListener("scroll", handleScroll);
  }, [keyword, sort, filter, page]);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight && articles.length < total) {
      setPage(page+1)
    }
  }

  const fetchList = async () => {
    try {
    let response = await getArticleList(page, keyword, filter, sort)
      if (response && response.response) {
      setArticles(response.response.docs)
        setTotal(response.response.total)
        setPage(response.response.page)
    }
    }
    catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div class="article-div">
      <Header />
     <FilterSearch 
     keyword={keyword} 
     setKeyword={(e) => setKeyword(e.target.value)}
     setSort={e => setSort(e)}
     onApplyFilter={e => setFilter(e)}
     />
     <ArticleList articles={articles}/>
    </div>
  );
}

export default Article;
