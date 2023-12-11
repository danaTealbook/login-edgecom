import React from "react";
import "../styles.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";

export default function MyTable({
  articles,
  editArticle,
  confirmDeleteArticle,
}) {
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<ion-icon name="pencil-outline"></ion-icon>}
          rounded
          outlined
          className="edit-button"
          onClick={() => editArticle(rowData)}
        />
        <Button
          icon={<ion-icon name="trash-outline"></ion-icon>}
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteArticle(rowData)}
        />
      </div>
    );
  };
  return (
    <DataTable
      value={articles}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 20]}
      className="table"
      dataKey="id"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} articles"
    >
      <Column
        field="title"
        header="Title"
        sortable
        responsivePriority="1"
        style={{ maxWidth: "20rem", overflow: "hidden" }}
      />
      <Column
        field="author"
        header="Author"
        sortable
        style={{ maxWidth: "20rem", overflow: "hidden" }}
      />
      <Column
        field="createdAt"
        header="Created At"
        sortable
        style={{ maxWidth: "20rem", overflow: "hidden" }}
      />
      <Column
        header="Actions"
        body={actionBodyTemplate}
        exportable={false}
        style={{ maxWidth: "20rem", overflow: "hidden" }}
        responsivePriority="2"
      ></Column>
    </DataTable>
  );
}
