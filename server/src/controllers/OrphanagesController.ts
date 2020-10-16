import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import Orphanage from "../models/Orphanages";
import orphanageView from "../views/orphanagesViews";

export default {
  /**
   * Path: /orphanages/ - GET
   */
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const orphanagesRepository = getRepository(Orphanage);

      // Gets orphanage list
      const orphanages = await orphanagesRepository.find({
        relations: ["images"],
      });

      // Return orphanages
      return response.send(orphanageView.renderMany(orphanages));

      // Handles errors
    } catch (error) {
      next(error);
    }
  },
  /**
   * Path: /orphanages/ - POST
   *
   * Creates a new orphanage in database
   */
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, files } = request;
      const requestImages = files as Express.Multer.File[];
      const orphanagesRepository = getRepository(Orphanage);

      // All data
      const data = {
        name: body.name,
        latitude: body.latitude,
        longitude: body.longitude,
        about: body.about,
        instructions: body.instructions,
        opening_hours: body.opening_hours,
        open_on_weekends: body.open_on_weekends == "true",
        images: requestImages.map((file) => ({
          path: file.filename,
        })),
      };

      // Data schema
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required(),
          })
        ),
      });

      await schema.validate(data, { abortEarly: false });

      // Creates orphanages
      const orphanage = orphanagesRepository.create(data);

      // Saves it
      const savedOrphanage = await orphanagesRepository.save(orphanage);

      // Returns orphanage data
      return response.status(201).send(orphanageView.render(savedOrphanage));
    } catch (error) {
      next(error);
    }
  },

  /**
   * Path: /orphanages/:id - GET
   */
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const id = Number(request.params.id);
      const orphanagesRepository = getRepository(Orphanage);

      // Gets orphanage or fail
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ["images"],
      });

      // Return orphanages
      return response.send(orphanageView.render(orphanage));

      // Handles errors
    } catch (error) {
      next(error);
    }
  },
};
