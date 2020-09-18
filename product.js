
/*
1. Regular expression
2. Middleware
3. npm install -save multer
4. Xử lý bất đồng bộ => callback
*/
const express = require("express")
const path = require("path")
const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});
/*
app.post("/post",(req,res)=>{
    res.send("Post Hello");
});
app.put("/put",(req,res)=>{
    res.send("Put Hello");
});
app.delete("/delete",(req,res)=>{
    res.send("Delete Hello");
});*/
app.get("/product", (req, res) => {
    // res.send("<h1>Wellcome to page Product</h1>")
    res.sendFile(__dirname + "/product.html")
})
const multer = require("multer")

const config = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads"); //uploads: folder upload 
    },
    // do Upload
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext) + "_" + Date.now();
        callback(null, fileName + ext);
        console.log()
    }
});
const upload = multer({ storage: config })

app.post("/upload", upload.single("file-to-upload"), (req, res) => {
    const file = req.file;
    if (!file) {
        res.send("Không tìm thấy file");
    }
    res.send("Upload file success");
})
/*
Upload multiple
app.post("/upload", upload.array("file-to-upload"), (req, res) => {
    const file = req.files;
    if (!file) {
        res.send("Không tìm thấy file");
    }
    res.send("Upload file success");
})*/
app.listen(3000, () => {
    console.log("Server starting...");
})