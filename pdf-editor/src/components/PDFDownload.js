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
        // const firstPage = pages[0]
        // const secondPage = pages[1]
       

        //console.log(secondPage);

        // Get the width and height of the first page
        const { width, height } = currentPage.getSize()
        console.log(width, height);
        /*
        const width1 = secondPage.getSize().width
        const height1 = secondPage.getSize().height
        const height2 = thirdPage.getSize().height
        const width2 = thirdPage.getSize().width
        const height3 = fourthPage.getSize().height
        const width3 = fourthPage.getSize().width*/
       
        //const pngDims = pngImage.scale(0.3)

        //const page = pdfDoc.addPage()

        let arX1 = arrowsArray[0].x1;
        let arY1 = arrowsArray[0].y1;
        let arX2 = arrowsArray[0].x1 + arrowsArray[0].x2;
        let arY2 = arrowsArray[0].y1 + arrowsArray[0].y2;

        let vrad = Math.atan((arY2 - arY1)/(arX2 - arX1));
        let vdeg = vrad * (180/Math.PI);

        let length1 = Math.sqrt(Math.pow((arY2 - arY1), 2) + Math.pow((arX2 - arX1), 2));

        let pl = 20;
        let pw = 20;

        let length2 = length1 - pl;

        let x3pr = Math.cos(vrad)*length2;
        let y3pr = Math.sin(vrad)*length2;

        let x3 = arX1 + x3pr;
        let y3 = arY1 + y3pr;

        let x4pr = Math.sin(vrad)*(pw/2);
        let y4pr = Math.cos(vrad)*(pw/2);

        let x4 = x3 + x4pr;
        let y4 = y3 - y4pr;

        let x5 = x3 - x4pr;
        let y5 = y3 + y4pr;

        console.log(arX1, arY1, arX2, arY2, vdeg, x3, y3, x4, y4, x5, y5);
        console.log(x3pr, y3pr);
        
        //_____
        const svgPath =
            'M'+arX1+' '+arY1+'L'+arX2+' '+arY2+' M'+x3+' '+y3+' L'+x4+' '+y4+' L'+arX2+' '+arY2+' L'+x5+' '+y5+''

            //M101 180 L110 179 L101 200 L90 180 Z
        //const svgPath3 =
            //'M250 300 L255 295 L260 310 L245 305 Z M'+arrows[1].x1+' '+arrows[1].y1+' L'+arrows[1].x2+' '+arrows[1].y2+''
        
        currentPage.moveTo(100, currentPage.getHeight() -5);

        // Draw the SVG path as a black line
        currentPage.moveDown(25)
        currentPage.drawSvgPath(svgPath, {color: rgb(1, 0, 0), borderWidth: 1, borderColor: rgb(1, 0, 0)})

        //let i = 0;
        //for(i = 0; i < rectArray.length; i++) {
       // if(rectArray.length === 0) {
            //return;
       // }
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

        //secondPage.moveTo(100, page.getHeight() - 5)

        // secondPage.moveDown(25)
        // secondPage.drawSvgPath(svgPath3, {color: rgb(1, 0, 0), borderWidth: 5, borderColor: rgb(1, 0, 0)})
      
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