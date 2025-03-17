import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";

export default function InvoicesMain() {
  const { token } = useContext(AppContext);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  async function getInvoices() {
    const res = await fetch("api/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setInvoices(data);
      getClients(data);
    }
  }

  async function getClients() {
    const res = await fetch("api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const clientsData = await res.json();
    if (res.ok) {
      setClients(clientsData);
    }
  }

  async function handleDelete(id) {
    const res = await fetch(`api/invoices/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setInvoices(
        invoices.filter((invoice) => {
          return invoice.id != id;
        })
      );
    }
    console.log(data);
  }

  const handleDownload = async (invoice) => {
    const client = findClientDataById(invoice.client_id);
    const date = new Date(invoice.created_at).toLocaleDateString("es-ES");
    const existingPdfBytes = await fetch("plantilla.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(`${invoice.id}`, {
      x: 120,
      y: 748,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });

    firstPage.drawText(`${date}`, {
      x: 120,
      y: 721,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });

    firstPage.drawText(`${client.name}`, {
      x: 350,
      y: 720,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(`${client.adress}`, {
      x: 350,
      y: 707,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });

    firstPage.drawText(`${client.postalCode}`, {
      x: 350,
      y: 695,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });

    firstPage.drawText(`${client.city}`, {
      x: 350,
      y: 683,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(`${client.CIF}`, {
      x: 350,
      y: 670,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(`${invoice.total}€`, {
      x: 515,
      y: 107,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
  };

  const findClientDataById = (id) => {
    return clients.find((client) => {
      return client.id == id;
    });
  };

  useEffect(() => {
    getInvoices();
  }, []);
  return (
    <>
      <div>
        <div className="create-client-button-container">
          <button
            className="btn form-btn btn-white btn-animated"
            onClick={() => navigate("/createinvoice")}
          >
            New Invoice
          </button>
        </div>
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div key={invoice.id}>
              <div>
                <div className="invoiceList-container">
                  <p>
                    <strong>Invoice Number: {invoice.id}</strong>
                  </p>
                  <p>Client: {findClientDataById(invoice.client_id)?.name}</p>
                  <p>Total Amount: {invoice.total}</p>
                  <p>{new Date(invoice.created_at).toLocaleDateString()}</p>
                  <div className="invoices-button-container">
                  <Link
                    to={`/invoices/edit/${invoice.id}`}
                    className="btn form-btn btn-white btn-animated"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn form-btn btn-white btn-animated"
                    onClick={() => handleDownload(invoice)}
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="btn form-btn btn-white btn-animated"
                  >
                    Delete
                  </button>
                  </div>
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-content">
            <p>There are no invoices created</p>
          </div>
        )}
      </div>
    </>
  );
}
