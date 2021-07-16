const voteService = require("../services/vote.service");
const db = require("../models");

exports.vote = async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const upvote = req.body.upvote;
    const isVoted = await voteService.isAlreadyVoted(userId, postId);
    const voteType = isVoted.voteType;
    const voteId = isVoted.voteId;
    if (voteType === null) {
      if (upvote) {
        const result = await voteService.createVote("up", userId, postId);
        res.status(201).json({ result: result });
      } else {
        const result = await voteService.createVote("down", userId, postId);
        res.status(201).json({ result: result });
      }
    } else if (voteType === "down") {
      if (upvote) {
        const result = await voteService.updateVote("up", voteId, postId);
        res.status(201).json({ result: result });
      } else {
        const result = await voteService.deleteVote("down", userId, postId);
        res.status(201).json({ result: result });
      }
    } else if (voteType === "up") {
      if (upvote) {
        const result = await voteService.deleteVote("up", userId, postId);
        res.status(201).json({ result: result });
      } else {
        const result = await voteService.updateVote("down", voteId, postId);
        res.status(201).json({ result: result });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("user already voted");
  }
};
