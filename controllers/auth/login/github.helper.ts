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
        username: Joi.string().email().required(),
        provider: Joi.string()
    })

    const { error } = schema.validate(req.body);

    if(error){
        return next(error)
    }

    // find user
    let user;
    try {
        user = await userModel.findOne({ username: req.body.username})
        if(!user){
            return next(CustomErrorHandler.notFound('user not found'))
        }
    } catch (err) {
        return next(err)
    }

    const [userProvider] = user.providers.filter((e)=> e.provider === "github")
    console.log(userProvider)
    return res.status(200)

    // genrate tokens

    let accessToken;
    let refreshToken;

    try {
        const payload: IPayload = {
            name: userProvider.name,
            profilePhotoURL: userProvider.profilePhotoURL,
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