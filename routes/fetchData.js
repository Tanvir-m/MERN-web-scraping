const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const PostData = require('../models/PostData');

const fbImageSelector =
  '#mount_0_0_w0 > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.j83agx80.cbu4d94t.dp1hu0rb > div > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.bp9cbjyn.j83agx80.cbu4d94t.taijpn5t.o4feeg3o > div > a > div > div > div > div > img';

router.post('/fetch-data', async (req, res) => {
  const articles = [];
  try {
    const res = await axios(req.body.data);
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);

    const meta = [];

    const title = $('title').text();
    const amImg = $('#landingImage').attr('src');
    const price = $(
      '#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.priceToPay > span:nth-child(2) > span.a-price-whole'
    ).text();
    const fbImg = $(fbImageSelector).attr('src');
    $('meta[content]').each((i, ele) => {
      meta.push(ele.attribs.content);
    });

    articles.push({
      title,
      amImg,
      fbImg,
      meta,
      price,
    });

    console.log(articles);
  } catch (err) {
    console.error(err);
  }

  res.send(articles);
});

router.post('/add', async (req, res) => {
  const addDetails = new PostData(req.body);
  try {
    const saveDetails = await addDetails.save();
    res.status(200).json(saveDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await PostData.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
