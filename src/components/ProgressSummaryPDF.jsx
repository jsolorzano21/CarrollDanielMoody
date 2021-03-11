import React, { Component } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF from '../documents/BCGHS.pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default class ProgressSummaryPDF extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  
  goToPrevPage = () =>
    this.setState((state) => {
      if(state.pageNumber <= 1)
        return {pageNumber: state.pageNumber=state.numPages};
      else
        return {pageNumber: state.pageNumber - 1 }}
        );
  goToNextPage = () =>
    this.setState((state) => { 
      if(state.pageNumber >= state.numPages)
        return {pageNumber: state.pageNumber=1};
      else
        return {pageNumber: state.pageNumber + 1 }}
        );

  render() {

    const { pageNumber, numPages } = this.state;
    
    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
          <a href={samplePDF} role="button"><button>Print/Download</button></a>
          <p>
          Page {pageNumber} of {numPages}
        </p>
        </nav>

        <div>
          <Document
            file={samplePDF}
            onLoadSuccess={this.onDocumentLoadSuccess}
          > 
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}