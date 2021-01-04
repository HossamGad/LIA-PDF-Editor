import React, { Component } from 'react';
import {PDFDocument, rgb } from 'pdf-lib';
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

        let pageIndex;

        if (this.props.arrowProps.length >= 1) {
            pageIndex = parseInt(this.props.arrowProps[0].page) - 1;
        } else if(this.props.textProps.length >= 1) {
            pageIndex = parseInt(this.props.textProps[0].page) - 1;
        } else if (this.props.rectProps.length >= 1) {
            pageIndex = parseInt(this.props.rectProps[0].page) - 1;
        } else {
            pageIndex = 0;
        }

        const currentPage = pages[pageIndex];
       
        // Get the width and height of the first page
        const { height } = currentPage.getSize();

        // Konva coordinates are multiplied by this factor.
        // Converts Konva coordinates to pdf-lib coordinates.
        const factor = 0.667;

        for(let k = 0; k < this.props.arrowProps.length; k++) {

            let arX1 = this.props.arrowProps[k].x*factor;
            let arY1 = this.props.arrowProps[k].y*factor;
            let arX2 = this.props.arrowProps[k].x*factor + this.props.arrowProps[k].points[2]*factor;
            let arY2 = this.props.arrowProps[k].y*factor + this.props.arrowProps[k].points[3]*factor;

            let vrad = arX2 > arX1 ? Math.atan((arY2 - arY1) / (arX2 - arX1)) : Math.atan((arY1 - arY2) / (arX1 - arX2));
            
            let length1 = arX2 > arX1 ? Math.sqrt(Math.pow((arY2 - arY1), 2) + Math.pow((arX2 - arX1), 2)) : Math.sqrt(Math.pow((arY1 - arY2), 2) + Math.pow((arX1 - arX2), 2));
            
            let pl = 20;
            let pw = 20;

            let length2 = length1 - pl;

            let x3pr = Math.cos(vrad)*length2;
            let y3pr = Math.sin(vrad)*length2;
            
            let x3 = arX2 > arX1 ? arX1 + x3pr : arX1 - x3pr;
            let y3 = arX2 > arX1 ? arY1 + y3pr : arY1 - y3pr;
            
            let x4pr = Math.sin(vrad)*(pw/2);
            let y4pr = Math.cos(vrad)*(pw/2);

            let x4 = arX2 > arX1 ? x3 + x4pr : x3 - x4pr;
            let y4 = arX2 > arX1 ? y3 - y4pr : y3 + y4pr;

            let x5 = arX2 > arX1 ? x3 - x4pr : x3 + x4pr;
            let y5 = arX2 > arX1 ? y3 + y4pr : y3 - y4pr;
            
            const svgPath =
                'M'+arX1+' '+arY1+'L'+arX2+' '+arY2+' M'+x3+' '+y3+' L'+x4+' '+y4+' L'+arX2+' '+arY2+' L'+x5+' '+y5+' L'+x3+' '+y3+''

            pages[this.props.arrowProps[k].page - 1].moveTo(0, pages[this.props.arrowProps[k].page - 1].getHeight() +25);

            // Draw the SVG path as a black line
            pages[this.props.arrowProps[k].page - 1].moveDown(25)
            pages[this.props.arrowProps[k].page - 1].drawSvgPath(svgPath, {color: rgb(1, 0, 0), borderWidth: 5*factor, borderColor: rgb(1, 0, 0)})
        }

        for(let i = 0; i < this.props.rectProps.length; i++) {
            pages[this.props.rectProps[i].page - 1].drawRectangle({
                x: this.props.rectProps[i].x*factor,
                y: height - this.props.rectProps[i].height*factor - this.props.rectProps[i].y*factor,
                width: this.props.rectProps[i].width*factor,
                height: this.props.rectProps[i].height*factor,
                color: rgb(1, 1, 0),
                opacity: 0.5 
            })
        }
        
        for(let j = 0; j < this.props.textProps.length; j++) {
            pages[this.props.textProps[j].page - 1].drawText(this.props.textProps[j].text,{
                x: this.props.textProps[j].x*factor,
                y: height - 40*factor - this.props.textProps[j].y*factor,
                size: 40*factor,
                //font: helveticaFont,
                color: rgb(0, 0, 0)
            })
        }
      
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