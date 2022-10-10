const express = require("express");
const report1Router = express.Router();
const moment = require("moment");

/* ES5 */
const htmlToImage = require("html-to-image");

//===============================
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
//===============================

const Airtable = require("airtable");
const { func } = require("prop-types");
const { description } = require("commander");
const { underline } = require("pdfkit");

const api_Key = "keymp2LxMAHUNmXHT";
const base_ID = "appFZpidalxK6vZo6";
const table_SEH_orders = "ЦЕХ заказы";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api_Key,
});
const base = Airtable.base(base_ID);

report1Router.use(express.static(__dirname + "public"));

report1Router.get("/blank_zakaza", function (request, res) {
  const recordid = request.query.recordid; // $_GET["id"]
  //var text2=request.query.text2;
  console.log("qadamloft " + recordid);
  base(table_SEH_orders).find(recordid, function (err, record) {
    console.log(record);
    if (err) {
      console.error("line 37: " + err);
      return;
    }
    const ordernum = record.get("order num");
    const productname = record.get("товар");
    const qty = record.get("саны");
    const comment1 = record.get("коммент");
    let comment2 = "если ЛДСП, то на весь заказ" + record.get("кмн стол") || "";
    // if (comment22 != undefined)
    //   comment2 = comment22 + " ( если ЛДСП, то на весь заказ)";
    // else comment2 = "";

    console.log("comment 1 ==== " + comment1);
    console.log("comment 2 ==== " + comment2);

    address = record.get("адрес доставки 2");
    postavshik = record.get("поставшик");

    paints = record.get("бояу");
    if (paints == undefined) paints = "НЕ ЗАПОЛНЕНО!?";

    deadline1 = record.get("дата Сдачи");
    deadline = new Date(deadline1).toLocaleDateString("uk-Uk");
    svarshik = record.get("svarshik");
    pic = record.get("сызба");
    zakaz_short = record.get("заказ");

    let photo;
    if (pic != undefined && pic.length > 0) photo = pic[0];

    console.log("ppppic  " + photo.url);
    line1 = "Заказ " + ordernum + " ";
    line2 = productname + " - " + qty + " шт";
    line3 = comment1;
    line4 = "краска " + paints;
    line5 = comment2 || "";
    line6 = "Поставщик " + postavshik;
    line7 = "Сроки " + deadline;
    line8 = address;
    line9 = "Сваршик " + svarshik;

    let airtableData = {
      line1: line1,
      line2: line2,
      line3: line3,
      line4: line4,
      line5: line5,
      line6: line6,
      line7: line7,
      line8: line8,
      line9: line9,
      pic: photo.url,
    };

    filename = zakaz_short + ".pdf";

    ejs.renderFile(
      path.join(__dirname, "../views/111.ejs"),
      { report1data: airtableData },
      (err, data) => {
        if (err) {
          console.log("error line 210" + err);
        } else {
          let options = {
            format: "A4",
            base: "file:///" + __dirname,

            header: {
              height: "2mm",
            },

            footer: {
              height: "20mm",
            },
          };

          pdf.create(data, options).toFile(filename, function (err, data) {
            if (err) {
              // res.send(err);
              console.log("error create pdf " + err);
            } else {
              //res.send("File created successfully");
              console.log("File created successfully");
              res.download(filename);
            }
          }); //end pdf creat
        }
      }
    ); //end ejs render file*/
  });
}); //end router test
module.exports = report1Router;
