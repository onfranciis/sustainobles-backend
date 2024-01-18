import { Request, Response } from "express";
import puppeteer from "puppeteer";
import config from "../config";

const CreatePDF = async (req: Request, res: Response) => {
  const date = new Date();
  const browser = await puppeteer.launch({
    headless: "new",
  });

  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ Authorization: `Bearer ${config.AUTH}` });
    await page.goto(`http://localhost:${config.PORT}/public`, {
      waitUntil: "load",
    });

    page
      .pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        margin: { top: "20", bottom: "40" },
        headerTemplate: ``,
        footerTemplate: `<footer style='
        width: 100%;
        max-width: 2000px;
        background-color: green;
        color: white;
        text-align: center;
        padding: 10px;
        margin-top: 50px;
        font-size: 1.5vw;
        '>
        ©Sustainobles ${date.getFullYear()}. This document was created electronically on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()} and is valid
        </footer>`,
      })
      .then((pdf) => {
        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": pdf.length,
        });

        res.send(pdf);
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: null, error: `Something went wrong!` });
      })
      .finally(() => {
        page.close();
      });
  } catch (err) {
    console.log(err);
    browser.close;
  }
};

export default CreatePDF;
