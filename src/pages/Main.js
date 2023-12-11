import React from "react";
import { useState, useEffect, useRef } from "react";
import "../styles.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import {
  mockGetArticles,
  mockSetArticles,
} from "../mockAPIFunctions/mockArticleFunctions";
import { mockSetLoggedInUser } from "../mockAPIFunctions/mockUserFunctions";
import MyTable from "../components/MyTable";
import MyTags from "../components/MyTags";

export default function Main() {
  let emptyArticle = {
    id: null,
    title: "",
    author: "",
    createdAt: "",
    content: "",
    tags: null,
  };

  const [article, setArticle] = useState(emptyArticle);
  const [articles, setArticles] = useState(mockGetArticles() || []);
  const [editDialog, setEditDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteArticleDialog, setDeleteArticleDialog] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    mockSetArticles(articles);
  }, [articles]);

  function handleLogOut() {
    mockSetLoggedInUser("");
    window.location.assign("/login");
  }

  function handleAddNewArticle() {
    window.location.assign("/new");
  }

  const editArticle = (article) => {
    setArticle({ ...article });
    setEditDialog(true);
  };

  const confirmDeleteArticle = (article) => {
    setArticle(article);
    setDeleteArticleDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEditDialog(false);
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id === id) {
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

  const handleSaveArticle = () => {
    setSubmitted(true);

    if (article.title.trim()) {
      let _articles = [...articles];
      let _article = { ...article };

      if (article.id) {
        const index = findIndexById(article.id);

        _articles[index] = _article;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Article Updated",
          life: 3000,
        });
      } else {
        _article.id = createId();
        _articles.push(_article);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Article Created",
          life: 3000,
        });
      }

      setArticles(_articles);
      setEditDialog(false);
      setArticle(emptyArticle);
    }
  };

  const articleDialogFooter = (
    <div>
      <Button
        label="Cancel"
        icon={<ion-icon name="close-outline"></ion-icon>}
        outlined
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon={<ion-icon name="checkmark-outline"></ion-icon>}
        onClick={handleSaveArticle}
      />
    </div>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _article = { ...article };

    _article[`${name}`] = val;

    setArticle(_article);
  };

  const hideDeleteArticleDialog = () => {
    setDeleteArticleDialog(false);
  };

  const deleteArticle = () => {
    let _articles = articles.filter((val) => val.id !== article.id);

    setArticles(_articles);
    setDeleteArticleDialog(false);
    setArticle(emptyArticle);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Article Deleted",
      life: 3000,
    });
  };

  const deleteArticleDialogFooter = (
    <div>
      <Button
        label="No"
        icon={<ion-icon name="close-outline"></ion-icon>}
        outlined
        onClick={hideDeleteArticleDialog}
      />
      <Button
        label="Yes"
        icon={<ion-icon name="checkmark-outline"></ion-icon>}
        severity="danger"
        onClick={deleteArticle}
      />
    </div>
  );

  return (
    <div className="articles-wrapper">
      <Toast ref={toast} />
      <div>
        <Button
          label="Log Out"
          severity="success"
          className="logout-btn"
          onClick={handleLogOut}
        />
        <div className="index-add">
          <h1>Index</h1>
          <Button
            label="Add"
            icon={<ion-icon name="add-outline"></ion-icon>}
            severity="success"
            onClick={handleAddNewArticle}
          />
        </div>
        <div className="scrollable-container">
          <MyTable
            articles={articles}
            editArticle={editArticle}
            confirmDeleteArticle={confirmDeleteArticle}
          />
        </div>
      </div>

      <Dialog
        visible={editDialog}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Article"
        modal
        className="p-fluid dialog"
        footer={articleDialogFooter}
        onHide={hideDialog}
      >
        <div className="edit-field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={article.title}
            onChange={(e) => onInputChange(e, "title")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !article.title })}
          />
          {submitted && !article.title && (
            <small className="p-error">Title is required.</small>
          )}
        </div>
        <div className="edit-field">
          <label htmlFor="content">Content</label>
          <InputTextarea
            id="content"
            value={article.content}
            onChange={(e) => onInputChange(e, "content")}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="edit-field">
          <label htmlFor="tags">Tags</label>
          <MyTags
            value={article.tags}
            onChange={(e) => onInputChange(e, "tags")}
          />
        </div>
      </Dialog>
      <Dialog
        visible={deleteArticleDialog}
        className="dialog"
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteArticleDialogFooter}
        onHide={hideDeleteArticleDialog}
      >
        <div>
          <i style={{ fontSize: "2rem" }} />
          {article && (
            <span>
              Are you sure you want to delete <b>{article.title}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
