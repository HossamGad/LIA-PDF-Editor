import React, { Component } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { rectArray } from "./Rectangle";
import { textArray } from "./TextEdit";
import { arrowsArray } from "./Arrows";

export class PDFDownload extends Component {
  constructor() {
    super();
    this.downloadPDF = this.downloadPDF.bind(this);
  }

  async downloadPDF() {
    console.log(rectArray);
    console.log(textArray);
    console.log(arrowsArray);

    const url = "myPDF.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages();

    let pageIndex;

    if (arrowsArray.length >= 1) {
      pageIndex = parseInt(arrowsArray[0].pg) - 1;
    } else if (textArray.length >= 1) {
      pageIndex = parseInt(textArray[0].pg) - 1;
    } else if (rectArray.length >= 1) {
      pageIndex = parseInt(rectArray[0].pg) - 1;
    } else {
      pageIndex = 0;
    }

    const currentPage = pages[pageIndex];

    // Get the width and height of the first page
    const { width, height } = currentPage.getSize();
    console.log(width, height);

    for (let k = 0; k < arrowsArray.length; k++) {
      let arX1 = arrowsArray[k].x1 * 0.667;
      let arY1 = arrowsArray[k].y1 * 0.667;
      let arX2 = arrowsArray[k].x1 * 0.667 + arrowsArray[k].x2 * 0.667;
      let arY2 = arrowsArray[k].y1 * 0.667 + arrowsArray[k].y2 * 0.667;

      console.log(arX1, arX2);

      let vrad =
        arX2 > arX1
          ? Math.atan((arY2 - arY1) / (arX2 - arX1))
          : Math.atan((arY1 - arY2) / (arX1 - arX2));

      let vdeg = vrad * (180 / Math.PI);

      console.log(vdeg);

      let length1 =
        arX2 > arX1
          ? Math.sqrt(Math.pow(arY2 - arY1, 2) + Math.pow(arX2 - arX1, 2))
          : Math.sqrt(Math.pow(arY1 - arY2, 2) + Math.pow(arX1 - arX2, 2));

      let pl = 20;
      let pw = 20;

      let length2 = length1 - pl;

      let x3pr = Math.cos(vrad) * length2;
      let y3pr = Math.sin(vrad) * length2;

      let x3 = arX2 > arX1 ? arX1 + x3pr : arX1 - x3pr;
      let y3 = arX2 > arX1 ? arY1 + y3pr : arY1 - y3pr;

      let x4pr = Math.sin(vrad) * (pw / 2);
      let y4pr = Math.cos(vrad) * (pw / 2);

      let x4 = arX2 > arX1 ? x3 + x4pr : x3 - x4pr;
      let y4 = arX2 > arX1 ? y3 - y4pr : y3 + y4pr;

      let x5 = arX2 > arX1 ? x3 - x4pr : x3 + x4pr;
      let y5 = arX2 > arX1 ? y3 + y4pr : y3 - y4pr;

      console.log(arX1, arY1, arX2, arY2, vdeg, x3, y3, x4, y4, x5, y5);
      console.log(x3pr, y3pr);

      const svgPath =
        "M" +
        arX1 +
        " " +
        arY1 +
        "L" +
        arX2 +
        " " +
        arY2 +
        " M" +
        x3 +
        " " +
        y3 +
        " L" +
        x4 +
        " " +
        y4 +
        " L" +
        arX2 +
        " " +
        arY2 +
        " L" +
        x5 +
        " " +
        y5 +
        " L" +
        x3 +
        " " +
        y3 +
        "";

      console.log(currentPage.getHeight());
      currentPage.moveTo(0, currentPage.getHeight() + 25);

      // Draw the SVG path as a black line
      currentPage.moveDown(25);
      currentPage.drawSvgPath(svgPath, {
        color: rgb(1, 0, 0),
        borderWidth: 5 * 0.667,
        borderColor: rgb(1, 0, 0),
      });
    }

    for (let i = 0; i < rectArray.length; i++) {
      currentPage.drawRectangle({
        x: rectArray[i].x * 0.667,
        y: height - rectArray[i].h * 0.667 - rectArray[i].y * 0.667,
        width: rectArray[i].w * 0.667,
        height: rectArray[i].h * 0.667,
        color: rgb(1, 1, 0),
        opacity: 0.5,
      });
    }

    for (let j = 0; j < textArray.length; j++) {
      currentPage.drawText(textArray[j].text, {
        x: textArray[j].x * 0.667,
        y: height - 40 * 0.667 - textArray[j].y * 0.667,
        size: 40 * 0.667,
        //font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    saveAs(pdfBlob, "myPDF.pdf");
  }

  render() {
    return (
      <>
        <button className="btn" id="download-pdf" onClick={this.downloadPDF}>
          Download PDF
        </button>
      </>
    );
  }
}
