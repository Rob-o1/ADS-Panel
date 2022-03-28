require('dotenv').config()
const express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
require("./db/conn");
const fileUpload = require("express-fileupload");
const port = process.env.PORT;
const app = express();

app.use(cors());

const AppRoutes = require("./routes/apps.routes"); //App_Routes
const AdvertisementPlaceRoutes = require("./routes/advertisementsPlaces.routes"); //Place_Routes
const TransactionDetailRoutes = require("./routes/transactionDetails.routes"); //Transaction_Detail_Routes
const TransactionSummaryRoutes = require("./routes/transactionSummaries.routes"); //Transaction_Summary_Routes
const AdvertisementRoutes = require("./routes/advertisements.routes"); //Advertisement_Routes

app.use(fileUpload({ limits: { fileSize: 20 * 1024 * 1024 }, }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

//Setting up cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Authorization,Accept",
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

app.use("/api", AppRoutes);
app.use("/api", AdvertisementPlaceRoutes);
app.use("/api", TransactionDetailRoutes);
app.use("/api", TransactionSummaryRoutes);
app.use("/api", AdvertisementRoutes);

app.listen(port, () => {
	console.log(`Backend Is Running At Port No. ${port}`);
});