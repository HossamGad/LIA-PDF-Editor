import React, { Component } from 'react';
import {PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { rectArray } from './Rectangle';
import { textArray } from './TextEdit';
import { arrowsArray } from './Arrows';

export class PDFDownload extends Component {
    constructor() {
        super();
        this.downloadPDF = this.downloadPDF.bind(this);
    }

    async downloadPDF() {

        console.log(rectArray);
        console.log(textArray);
        console.log(arrowsArray);

        const url = 'myPDF.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Embed the Helvetica font
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Get the first page of the document
        const pages = pdfDoc.getPages()

        const pageIndex = parseInt(rectArray[0].pg) - 1;
        console.log("I am drawing on this page", pageIndex + 1);
        const currentPage = pages[pageIndex];
       
        // Get the width and height of the first page
        const { width, height } = currentPage.getSize()
        console.log(width, height);
        
        let arX1 = arrowsArray[0].x1*0.667;
        let arY1 = arrowsArray[0].y1*0.667;
        let arX2 = arrowsArray[0].x1*0.667 + arrowsArray[0].x2*0.667;
        let arY2 = arrowsArray[0].y1*0.667 + arrowsArray[0].y2*0.667;

        console.log(arX1, arX2);

        let vrad = arX2 > arX1 ? Math.atan((arY2 - arY1) / (arX2 - arX1)) : Math.atan((arY1 - arY2) / (arX1 - arX2));

        let vdeg = vrad * (180/Math.PI);

        console.log(vdeg);
        
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

        console.log(arX1, arY1, arX2, arY2, vdeg, x3, y3, x4, y4, x5, y5);
        console.log(x3pr, y3pr);
        
        const svgPath =
            'M'+arX1+' '+arY1+'L'+arX2+' '+arY2+' M'+x3+' '+y3+' L'+x4+' '+y4+' L'+arX2+' '+arY2+' L'+x5+' '+y5+' L'+x3+' '+y3+''

        console.log(currentPage.getHeight());
        currentPage.moveTo(0, currentPage.getHeight() +25);

        // Draw the SVG path as a black line
        currentPage.moveDown(25)
        currentPage.drawSvgPath(svgPath, {color: rgb(1, 0, 0), borderWidth: 5*0.667, borderColor: rgb(1, 0, 0)})

       currentPage.drawRectangle({
            x: rectArray[0].x*0.667,
            y: height - rectArray[0].h*0.667 - rectArray[0].y*0.667,
            width: rectArray[0].w*0.667,
            height: rectArray[0].h*0.667,
            color: rgb(1, 1, 0),
            opacity: 0.5 
            })
        
        currentPage.drawText(textArray[0].text,{
            x: textArray[0].x*0.667,
            y: height - 40*0.667 - textArray[0].y*0.667,
            size: 40*0.667,
            //font: helveticaFont,
            color: rgb(0, 0, 0)
        })
      
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