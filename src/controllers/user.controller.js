import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res, next) => {
    // get user details from frontend
    // validation - not empty - check if data is correct,
    // if user already register: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    try {
        const { fullName, email, username, password } = req.body;
        console.log("req.body data", fullName, email, username, password);
        if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const existedUser = User.findOne({
            $or: [{ username }, { email }]
        });
        console.log("existed user", existedUser);

        if (existedUser) {
            throw new ApiError(409, "User with same username or email already present");
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        console.log("req.files", req.files);
        console.log("avatar local path", avatarLocalPath);
        console.log("cover image local path", coverImageLocalPath);

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
        }

        const user = await User.create({
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            username: username.toLowerCase(),
            fullName,
            email,
            password,
        });

        const createdUser = User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        )

    } catch (error) {
        throw new ApiError(500, "cannot fulfil the request");
    }
});

