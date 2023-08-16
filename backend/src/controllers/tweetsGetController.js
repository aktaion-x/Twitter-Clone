const Tweet = require("../models/Tweet");

const getTweet = async (req, res) => {
  const id = req.params.id;
  try {
    const tweet = await Tweet.findById(id).populate([
      {
        path: "author"
      },
      {
        path: "replies",
        populate: [
          {
            path: "author",
            model: "User"
          },
          {
            path: "quotedTweet",
            model: "Tweet"
          },
          {
            path: "parentTweet",
            populate: {
              path: "author",
              model: "User"
            }
          }
        ],
        options: { sort: { createdAt: -1 } }
      },
      {
        path: "quotedTweet",
        populate: {
          path: "author",
          model: "User"
        },
        options: { sort: { createdAt: -1 } }
      },
      {
        path: "parentTweet",
        populate: {
          path: "author",
          model: "User"
        },
        options: { sort: { createdAt: -1 } }
      }
    ]);
    res.status(200).json({ message: "ok", data: tweet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getParent = async (req, res) => {
  const id = req.params.id;
  try {
    const parentTweet = await Tweet.findById(id);
    res.status(200).json({ message: "ok", data: parentTweet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReplies = async (req, res) => {
  const id = req.params.id;
  try {
    const replies = await Tweet.findById(id).populate({
      path: "replies",
      populate: {
        path: "author",
        model: "User"
      },
      options: { sort: { createdAt: -1 } }
    });

    res.status(200).json({ message: "ok", data: replies });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getQuotes = async (req, res) => {
  const id = req.params.id;
  try {
    const quotes = await Tweet.findById(id).populate({
      path: "quotes",
      populate: [
        {
          path: "author",
          model: "User"
        },
        {
          path: "quotedTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        }
      ],
      options: { sort: { createdAt: -1 } }
    });

    res.status(200).json({ message: "ok", data: quotes.quotes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRetweets = async (req, res) => {
  const id = req.params.id;
  try {
    const retweets = await Tweet.findById(id)
      .populate({
        path: "retweets",
        model: "User"
      })
      .select("retweets");
    res.status(200).json({ message: "ok", data: retweets.retweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLikes = async (req, res) => {
  const id = req.params.id;
  try {
    const likes = await Tweet.findById(id)
      .populate({
        path: "likes",
        model: "User"
      })
      .select("likes");
    res.status(200).json({ message: "ok", data: likes.likes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTweet,
  getParent,
  getReplies,
  getQuotes,
  getRetweets,
  getLikes
};
