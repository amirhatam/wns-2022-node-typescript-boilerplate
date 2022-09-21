import dataSource from "../utils";
import { Request, Response } from "express";

import { Skill } from "../entity/Skill";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}
const skillController: IController = {
  read: async (req, res) => {
    const allSkills = await dataSource.getRepository(Skill).find();
    res.send(allSkills);
  },
  create: async (req, res): Promise<void> => {
    console.log(req.body);
    dataSource
      .getRepository(Skill)
      .save(req.body)
      .then(() => {
        res.status(201).send("Skill created");
      })
      .catch((error) => {
        console.log("Error", error);
        res.status(500).send("Error while creating the skill");
      });
  },
  delete: async (req, res) => {
    console.log(req.body);
    await dataSource.getRepository(Skill).delete(req.body.idToDelete);
    res.send("Skill deleted");
  },
  update: async (req, res) => {
    console.log(req.body);
    await dataSource
      .getRepository(Skill)
      .update(req.body.id, { name: req.body.name });
    res.send("Skill Updated");
  },
};

export default skillController;
