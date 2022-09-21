import dataSource from "../utils";
import { Request, Response } from "express";

import { Grade } from "../entity/grade";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}
const gradeController: IController = {
  create: async (req, res): Promise<void> => {
    const wilderFromDB = await dataSource
      .getRepository(Wilder)
      .findOneBy({ name: req.body.name });

    const skillFromDB = await dataSource
      .getRepository(Skill)
      .findOneBy({ name: req.body.name });

    if (wilderFromDB !== null && skillFromDB !== null) {
      const grade = new Grade();
      grade.skillId = wilderFromDB?.id;
      grade.wilderId = skillFromDB?.id;

      await dataSource.getRepository(Grade).save(grade);
    }

    // await dataSource.getRepository(Grade).save({
    //   grade: req.body.grade,
    //   wilder: wilderFromDB,
    //   skill: skillFromDB,
    // });

    res.send("Grade created");
  },
};

export default gradeController;
