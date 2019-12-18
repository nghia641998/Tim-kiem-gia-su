var express = require('express');
var router = express.Router();
const CheckUser = require('../../middlewares/checkUser');
const Contract = require('../../models/contract');
const User = require('../../models/user');
const stripe = require("stripe")("sk_test_u1KwHkCuj6A5ivGUQd3y1Jce");

// Xử lí req lấy hợp đồng theo id
// GET /contract/:id
router.get('/:id', (req, res) => {
    Contract.getOneById(req.params.id)
        .then((contract) => res.status(200).json({
            results: {
                object: {
                    ...contract._doc
                }
            }
        }))
        .catch(() => res.status(500).json({message: "Lỗi không xác định được. Thử lại sau"}));
});


// Xử lí req tạo hợp đồng
// POST /contract/create
router.post('/create', CheckUser.passIfIsStudent, async (req, res) => {
    const {tokenId,feePerHour,numberOfHour} = req.body;
    if(!tokenId) res.status(500).json({message: "Thanh toán lỗi. Token is undefined"});

    let status
    try {
      const res = await stripe.charges.create({
        amount: feePerHour*numberOfHour,
        currency: "vnd",
        description: "An example charge",
        source: tokenId
      });
      status = res.status;
    } catch(err) {
      console.log('err',err)
      return res.status(500).json({message: "Thanh toán thất bại"});
    }

    try {
        const contract = await Contract.create(req.userInfo.id, req.body);
        res.status(200).json({
            results: {
                object: {
                    ...contract._doc
                },
                status
            }
        });
    } catch (err) {
        res.status(500).json({message: "Lỗi không xác định được. Thử lại sau"});
    }
});

// Xử lí req update hợp đồng
// POST /contract/update
router.post('/update', CheckUser.passIfHaveValidToken, (req, res) => {
    Contract.updateById(req.userInfo.id, req.body.id, req.body)
        .then(() => res.status(200).json({
            results: {
                object: {
                    ...req.body
                }
            }
        }))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

// Xử lí req lấy danh sách hợp đồng
// POST /contract/getList
router.post('/getList', CheckUser.passIfHaveValidToken, (req, res) => {
    const { page, limit, sort, condition } = req.body;
    Contract.getListContractOfUser(req.userInfo.id, req.userInfo.role, page, limit, sort, condition)
        .then((rs) => res.status(200).json({
            results: {
                object: {
                    ...rs
                }
            }
        }))
        .catch((err) => res.status(500).json({message: err.message}));
});

// Xử lí req lấy danh sách hợp đồng có đánh giá của giáo viên
// POST /contract/getListReview
router.post('/getListReview', (req, res) => {
  const {id,role, page, limit, sort, condition } = req.body;
  Contract.getListContractOfUser(id, role, page, limit, sort, condition)
      .then((rs) => res.status(200).json({
          results: {
              object: {
                  ...rs
              }
          }
      }))
      .catch((err) => res.status(500).json({message: err.message}));
});
module.exports = router;