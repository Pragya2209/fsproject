import React from "react";
import moment from "moment";

function ArticleList(props) {
  const displayArticleList = () => {
    let arr = [];
    for (let i in props.articles) {
      let article = props.articles[i];
      arr.push(
        <div key={i} class="article-list-div">
          <img class="thumbnail" src={article.thumbnail} />
          <div class="article-info">
            <span class="article-category">{article.category}</span>
            <span class="article-time">
              {" "}
              :{" "}
              {Math.ceil(
                moment.duration(moment().diff(article.createdAt)).asHours()
              )}
              h ago
            </span>
            <div class="article-heading">"{article.heading}"</div>
            <div class="article-time">
              by <span class="article-author">{article.author}</span>
            </div>
          </div>
        </div>
      );
    }
    return arr;
  };
  return <div>{displayArticleList()}</div>;
}

export default ArticleList;
