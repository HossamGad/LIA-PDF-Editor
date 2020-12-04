import React, { Component } from 'react';
import {PDFDocument, rgb} from 'pdf-lib';
import { saveAs } from 'file-saver';

export class PDFDownload extends Component {
    constructor() {
        super();
        this.downloadPDF = this.downloadPDF.bind(this);
    }

    async downloadPDF() {
        
        const url = 'myPDF.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Embed the Helvetica font
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
       

        //console.log(secondPage);

        // Get the width and height of the first page
       /* const { width, height } = firstPage.getSize()
        const width1 = secondPage.getSize().width
        const height1 = secondPage.getSize().height
        const height2 = thirdPage.getSize().height
        const width2 = thirdPage.getSize().width
        const height3 = fourthPage.getSize().height
        const width3 = fourthPage.getSize().width*/

        

       
        //const pngDims = pngImage.scale(0.3)

        const page = pdfDoc.addPage()
        
        //_____
        const svgPath =
            'M150 100 L130 150 L170 150 Z M150 150 L150 200'
        
        const svgPath2 = 
            'M150 0 L300 0 L300 30 L150 30 Z'
        
        firstPage.moveTo(100, page.getHeight() - 5)

        // Draw the SVG path as a black line
        firstPage.moveDown(25)
        firstPage.drawSvgPath(svgPath, {color: rgb(1, 0, 0), borderWidth: 5, borderColor: rgb(0, 1, 0)})

        firstPage.moveDown(200)
        firstPage.drawSvgPath(svgPath2, {color: rgb(1, 0, 0)})
      
        const pdfBytes = await pdfDoc.save()
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        saveAs(pdfBlob, 'myPDF.pdf');
    }

    render() {
        return (
            <>
            <button className="btn" id="download-pdf" onClick={this.downloadPDF}>Download PDF</button>
            </>
        )
    }

}