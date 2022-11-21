import { Request, Response, NextFunction } from "express";
import CustomErrorHandler from "../../../services/CustomErrorHandler";
import Joi from "joi"
import userModel from "../../../models/user.model";
import refreshModel from "../../../models/refresh.model";
import Jwt from '../../../services/Jwt'
import ENV from '../../../config'
import { IPayload } from "../../../types";
const { JWT_REFRESH_SECRET } = ENV

export const githubHelper = async (
    req: Request,
    res: Response,
    next: NextFunction,
    provider: string
) => {
    // validate schema
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        username: Joi.string().email().required(),
        profilePhotoURL: Joi.string().uri(),
        provider: Joi.string()
    })

    const { error } = schema.validate(req.body);

    if(error){
        return next(error)
    }

    // check for existing user

    try {
        const exist = await userModel.exists({ username: req.body.username})
        if(exist){
            return next(CustomErrorHandler.alreadyExist('This email is already in use'))
        }
    } catch (err) {
        return next(err)
    }

    const user = new userModel({
        username: req.body.username,
        providers: [{
            provider,
            name: req.body.name,
            profilePhotoURL: req.body.profilePhotoURL,
            isEmailPassword: false,
        }]
    })

    // genrate tokens

    let accessToken;
    let refreshToken;

    try {
        await user.save()
        const payload: IPayload = {
            name: req.body.name,
            profilePhotoURL: req.body.profilePhotoURL,
            username: req.body.username
        }
        accessToken = Jwt.createToken(payload)
        refreshToken = Jwt.createToken(payload,'7d',JWT_REFRESH_SECRET)
        await refreshModel.create({ token: refreshToken })
    } catch (err) {
        return next(err)
    }

    res.status(200).json({ accessToken, refreshToken })    
}