import React from "react";
import { useState, useEffect, useRef } from "react";
import "../styles.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import {
  mockGetArticles,
  mockSetArticles,
} from "../mockAPIFunctions/mockArticleFunctions";
import {
  mockGetLoggedInUser,
  mockSetLoggedInUser,
} from "../mockAPIFunctions/mockUserFunctions";
import MyTags from "../components/MyTags";

export default function NewArticle() {
  let emptyArticle = {
    id: null,
    title: "",
    author: "",
    createdAt: "",
    content: "",
    tags: [],
  };

  const [article, setArticle] = useState(emptyArticle);
  const [articles, setArticles] = useState(mockGetArticles() || []);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    mockSetArticles(articles);
  }, [articles]);

  function handleLogOut() {
    mockSetLoggedInUser("");
    window.location.assign("/login");
  }

  const findIndexByTitle = (title) => {
    let index = -1;

    for (let i = 0; i < articles.length; i++) {
      if (articles[i].title === title) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  function getMonthInString(month) {
    if (month === 0) return "Jan";
    if (month === 1) return "Feb";
    if (month === 2) return "Mar";
    if (month === 3) return "Apr";
    if (month === 4) return "May";
    if (month === 5) return "Jun";
    if (month === 6) return "Jul";
    if (month === 7) return "Aug";
    if (month === 8) return "Sep";
    if (month === 9) return "Oct";
    if (month === 10) return "Nov";
    if (month === 11) return "Dec";
  }

  const handleAddArticle = () => {
    setSubmitted(true);

    if (article.title.trim()) {
      let _articles = [...articles];
      let _article = { ...article };

      const index = findIndexByTitle(article.title);

      if (index > -1) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Title already exists",
          life: 3000,
        });
      } else {
        _article.id = createId();
        _article.tags = selectedTags;
        _article.author = mockGetLoggedInUser();

        const date = new Date();
        let created =
          date.getDate() +
          " " +
          getMonthInString(date.getMonth()) +
          " " +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        _article.createdAt = created;

        _articles.push(_article);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Article Created",
          life: 3000,
        });
        setArticles(_articles);
        setArticle(emptyArticle);
        setSubmitted(false);
      }
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _article = { ...article };

    _article[`${name}`] = val;

    setArticle(_article);
  };

  function handleChange(e) {
    setSelectedTags(e.value);
  }

  return (
    <div className="new-article-wrapper">
      <Toast ref={toast} />
      <div>
        <Button
          label="Log Out"
          severity="success"
          className="logout-btn"
          onClick={handleLogOut}
        />
        <div className="new-article">
          <h1>New Article</h1>
          <a href="/" className="register-link">
            Back to Index
          </a>
        </div>

        <div>
          <div className="grid">
            <label htmlFor="title">Title</label>
            <InputText
              id="title"
              value={article.title}
              onChange={(e) => onInputChange(e, "title")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !article.title,
              })}
            />
            {submitted && !article.title && (
              <small className="p-error">Title is required.</small>
            )}
          </div>
          <div className="grid">
            <label htmlFor="content">Content</label>
            <InputTextarea
              id="content"
              value={article.content}
              onChange={(e) => onInputChange(e, "content")}
              required
              rows={3}
              cols={50}
            />
          </div>
          <div className="grid">
            <label htmlFor="tags">Tags</label>
            <MyTags value={selectedTags} onChange={handleChange} />
          </div>
        </div>

        <div className="add-button">
          <Button
            label="Create"
            icon={<ion-icon name="add-outline"></ion-icon>}
            onClick={handleAddArticle}
          />
        </div>
      </div>
    </div>
  );
}
