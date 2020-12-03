import React, { Component } from "react";
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import * as PdfJsLib from 'pdfjs-dist/build/pdf';

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5

export class PDFViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            actualPage: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.queueRenderPage = this.queueRenderPage.bind(this);
        this.showPrevPage = this.showPrevPage.bind(this);
        this.showNextPage = this.showNextPage.bind(this); 
    }

    handleClick() {

        //console.log(PdfJsLib);

        PdfJsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
        PdfJsLib.getDocument('./myPDF.pdf').promise.then(pdfDoc_ => {

            pdfDoc = pdfDoc_;
            this.setState({
                pages: pdfDoc.numPages,
                actualPage: pageNum
            });

            this.renderPage(this.state.actualPage);

            //console.log(this.state.pages);
            //console.log(pdfDoc);
        
        }).catch(err => { console.log(JSON.stringify(err)) });
    }

    renderPage = (num) => {
        pageIsRendering = true;
    
        pdfDoc.getPage(num).then(page => {

            let canvas = document.getElementById('pdf-render');
            //console.log(canvas);
            let ctx = canvas.getContext('2d');

            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderCtx = {
                canvasContext: ctx,
                viewport
              };

            page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
        
            if (pageNumIsPending !== null) {
                this.renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
            });
        });
    
        this.setState({
            actualPage: num
        });

        this.props.cPage(num);
        //console.log(this.state.actualPage);
    }

    queueRenderPage = num => {
        if (pageIsRendering) {
          pageNumIsPending = num;
        } else {
          this.renderPage(num);
        }
      };

    showPrevPage() {
        let p = this.state.actualPage;
        if (p === 0 || p <= 1) {
            return;
        }
        p--;
        this.queueRenderPage(p);
    }
      
    showNextPage() {
        let p = this.state.actualPage;
        if (p === 0 || p >= pdfDoc.numPages) {
            return;
        }
        p++;
        this.queueRenderPage(p);
    }
  
    render() {
        return (
            <>
                <button className="btn" id="prev-page" style={{float:"left"}} onClick={this.showPrevPage}>
                    <i className="fas fa-arrow-circle-left"></i> Prev Page
                </button>
                <button className="btn" id="next-page" style={{float:"left"}} onClick={this.showNextPage}>
                    Next Page <i className="fas fa-arrow-circle-right"></i>
                </button>
                <button className="btn" id="load-pdf" onClick={this.handleClick}>Upload PDF</button>
                <span className="page-info" style={{float:"left"}}>
                    Page <span id="page-num">{ this.state.actualPage }</span> of <span id="page-count">{ this.state.pages }</span>
                </span>
            </>
        );
    }
}












