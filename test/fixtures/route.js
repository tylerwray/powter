let testBunny = {
  name: 'fluffykins',
  color: 'beige',
  weight: 'extra fat'
}


const Bunny = {
  getBunny: (req, res) => {
    res.json(testBunny)
  },

  postBunny: (req, res) => {
    const newBunny = Object.create(testBunny)
    res.json(newBunny)
  },

  putBunny: (req, res) => {
    if (req.body.name) {
      testBunny.name = req.body.name
    }

    if (req.body.color) {
      testBunny.color = req.body.color
    }

    if (req.body.weight) {
      testBunny.weight = req.body.weight
    }

    res.json(testBunny)
  },

  removeBunny: (req, res) => {
    delete testBunny.name
    delete testBunny.color
    delete testBunny.weight

    res.json({
      success: true
    })
  },
}

module.exports = Bunny
