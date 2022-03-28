const router = require("express").Router();
const TransactionDetailController = require("../controllers/transactionDetails.controller");
const { transactionDetailValidation } = require("../valiadation/transactionDetails.validation");


//Transaction_Details
router.post("/transaction/create", transactionDetailValidation, TransactionDetailController.createTransaction);
router.get("/transaction/list", TransactionDetailController.fetchTransactionDetailList);
router.get("/transaction/:id", TransactionDetailController.fetchTransactionDetailById);
router.put("/transaction/updateby/:id", TransactionDetailController.updateTransactionDetailById);
router.delete("/transaction/deleteby/:id", TransactionDetailController.deleteTransactionDetailById);

module.exports = router;