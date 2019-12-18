const postRouter = require("express").Router();
const db = require("../data/db-config"); // database access using knex

postRouter

  .get("/", async (req, res, next) => {
    try {
      const posts = await db('posts')
      return res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  })

  .get("/:id", async (req, res, next) => {
    try {
      const post = await db('posts').where({ id: req.params.id }).first()
      res.status(200).json(post)
    } catch (error) {
      next(error)
    }
  })

  .post("/", async (req, res, next) => {
    try {
      const [post] = await db('posts').insert({ title: req.body.title, contents: req.body.contents });
      res.status(201).json(await db('posts').where("id", post).first());
    } catch (error) {
      next(error)
    }
  })

  .put("/:id", async (req, res, next) => {
    try {
      const post = await db('posts').where({ id: req.params.id }).update({ title: req.body.title, contents: req.body.contents });
      res.status(200).json(await db('posts').where("id", req.params.id).first())
    } catch (error) {
      next(error)
    }
  })

  .delete("/:id", async (req, res, next) => {
    try {
      const post = await db('posts').where({ id: req.params.id }).delete();
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  });

module.exports = postRouter;
