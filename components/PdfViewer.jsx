import React from "react";

import { Document, Page, pdfjs } from "react-pdf";

import { RiLoaderFill } from "react-icons/ri";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";

const PdfViewer = ({ url, width, pageNumber, onLoading }) => (
  <Document
    file={url}
    loading={
      <span className="animate-spin">
        <RiLoaderFill />
      </span>
    }
  >
    <Page
      pageNumber={pageNumber}
      width={width}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      className={"w-1"}
      loading="please wait"
    />
  </Document>
);

export default PdfViewer;
