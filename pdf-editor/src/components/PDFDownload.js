import React, { Component } from 'react';
import {PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { rectArray } from './Rectangle';
import { textArray } from './TextEdit';

let arrows = [
    {
        page: 1,
        x1: 150,
        y1: 100,
        x2: 250,
        y2: 100        
    },
    {
        page: 2,
        x1: 150,
        y1: 200,
        x2: 250,
        y2: 300        
    }
];

/*
let rectangles = [
    {
        x1: 100,
        y1: 200,
        width: 100,
        height: 30 
    },
    {
        x1: 200,
        y1: 200,
        width: 100,
        height: 30 
    }
]
*/

export class PDFDownload extends Component {
    constructor() {
        super();
        this.downloadPDF = this.downloadPDF.bind(this);
    }

    async downloadPDF() {

        console.log(rectArray);
        console.log(textArray);

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
        
        //_____
        const svgPath =
            'M250 100 L250 90 L270 100 L250 110 Z M'+arrows[0].x1+' '+arrows[0].y1+' L'+arrows[0].x2+' '+arrows[0].y2+''

        //const svgPath3 =
            //'M250 300 L255 295 L260 310 L245 305 Z M'+arrows[1].x1+' '+arrows[1].y1+' L'+arrows[1].x2+' '+arrows[1].y2+''
        
        currentPage.moveTo(0, 0);

        // Draw the SVG path as a black line
        currentPage.moveDown(25)
        currentPage.drawSvgPath(svgPath, {color: rgb(1, 0, 0), borderWidth: 5, borderColor: rgb(1, 0, 0)})

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