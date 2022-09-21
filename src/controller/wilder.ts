import { Request, Response } from "express";
import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
// import { Skill } from "../entity/Skill";
// import { Grade } from "../entity/grade";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}
const wilderController: IController = {
  read: async (req, res) => {
    const allWilders = await dataSource.getRepository(Wilder).find({
      relations: {
        grades: {
          skill: true,
        },
      },
    });
    res.send(allWilders);
  },
  create: async (req, res): Promise<void> => {
    try {
      console.log("req.body ======>", req.body);
      await dataSource
        .getRepository(Wilder)
        .save(req.body)

        // .save({ name: req.body.name })
        .then(() => {
          res.status(201).send("Wilder created");
        });
    } catch (err) {
      res.status(500).send("Error while creating the wilder");
    }
  },
  delete: async (req, res) => {
    console.log(req.body);
    await dataSource.getRepository(Wilder).delete(req.body.idToDelete);
    res.send("wilder deleted");
  },
  update: async (req, res) => {
    console.log(req.body);
    await dataSource
      .getRepository(Wilder)
      .update(req.body.id, { name: req.body.name });
    res.send("Wilder Updated");
  },
};

export default wilderController;

// try {
//   const wilder = await dataSource
//     .getRepository(Wilder)
//     .findOneBy({ name: req.body.name });

//   if (req.body.skills.length > 0) {
//     req.body.skills.forEach(async (skill: any) => {
//       const skillToAdd = await dataSource
//         .getRepository(Skill)
//         .findOneBy({ name: skill.name });
//       console.log("found skill to add", skillToAdd);
//       if (skillToAdd !== null && wilder !== null) {
//         const grade = new Grade();
//         grade.skillId = skillToAdd?.id;
//         grade.wilderId = wilder?.id;

//         await dataSource.getRepository(Grade).save(
//           grade
//           // wilder: createdWilder,
//           // grade: skill.votes,
//           // skill: skillToAdd,
//         );
//       }
//     });
//   }
// } catch (error) {
//   console.log("Error", error);
//   res.status(500).send("Error while creating the wilder");
// }
