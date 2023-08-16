const getAverage = tweets => {
  const unorderedTweets = tweets.map(tweet => {
    const average = (tweet.likes.length + tweet.quotes.length + tweet.retweets.length + tweet.replies.length) / 4;
    return { ...tweet._doc, average };
  });
  return unorderedTweets.sort((a, b) => b.average - a.average);
};

module.exports = { getAverage };
