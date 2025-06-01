const userModel = require("../model/userModel.js");
const CustomError = require("../utils/customError.js");
const mongoose = require("mongoose");

//add user

const addUser = async (req, res, next) => {
  const data = req.body;

  if (req.imageData) {
    data["profileImage"] = req.imageData;
  }

  if (req.body.password !== req.body.confirmPassword)
    return next(new CustomError("Passwords do not match", 400));

  if (req.user.role !== "ADMIN")
      return next(new CustomError("Only ADMIN can add new agent", 400));
  try {
    const agentInfo = new userModel(data);
    const result = await agentInfo.save();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

//get all users

const getUsers = async (req, res, next) => {
  const { role, page, limit, search } = req.query;
  const PAGE = Number(page) || 1;
  const LIMIT = Number(limit) || 10;
  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;

  const query = {};
  if (role) query["role"] = role;
  if (search) {
    query["$text"] = {
      $search: search,
      $caseSensitive: false,
      $diacriticSensitive: true
    };
  }

  try {
    const totalUsers = await userModel.find(query).countDocuments();
    const result = {};
    if (endIndex < totalUsers) {
      result.next = {
        pageNumber: PAGE + 1,
        limit: LIMIT
      };
    }
    if (startIndex > 0) {
      result.previous = {
        pageNumber: PAGE - 1,
        limit: LIMIT
      };
    }

    const pipeline = [
      { $match: query },
      {
        $addFields: {
          strUserId: { $toString: "$_id" }
        }
      }
    ];

    if (role === "AGENT" || role === "DONOR") {
      pipeline.push({
        $lookup: {
          from: "donations",
          localField: "strUserId",
          foreignField: role === "AGENT" ? "agentId" : "donorId",
          as: "donations"
        }
      });

      const donationCountBaseOnStatus = (status) => ({
        $size: {
          $filter: {
            input: "$donations",
            as: "item",
            cond: { $eq: ["$$item.status", status] }
          }
        }
      });

      pipeline.push({
        $project: {
          _id: 1,
          email: 1,
          address: 1,
          role: 1,
          createdAt: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          phoneNo: 1,
          collected: donationCountBaseOnStatus("COLLECTED"),
          accepted: donationCountBaseOnStatus("ACCEPTED"),
          rejected: donationCountBaseOnStatus("REJECTED"),
          pending: donationCountBaseOnStatus("PENDING")
        }
      });
    } else {
      pipeline.push({
        $project: {
          _id: 1,
          email: 1,
          address: 1,
          role: 1,
          createdAt: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          phoneNo: 1
        }
      });
    }

    result.users = await userModel
      .aggregate(pipeline)
      .sort({ firstName: 1 })
      .skip(startIndex)
      .limit(LIMIT);

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

//get single user

const getUser = async (req, res, next) => {
  const userId = req.query.userId || req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new CustomError("Invalid user ID", 400));
  }

  const objectId = new mongoose.Types.ObjectId(userId);

  try {
    const [user] = await userModel.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "donations",
          let: { userIdStr: { $toString: "$_id" }, userRole: "$role" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $cond: [
                    { $eq: ["$$userRole", "AGENT"] },
                    { $eq: ["$agentId", "$$userIdStr"] },
                    {
                      $cond: [
                        { $eq: ["$$userRole", "DONOR"] },
                        { $eq: ["$donorId", "$$userIdStr"] },
                        false
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: "donations"
        }
      },
      {
        $addFields: {
          collected: {
            $cond: [
              { $eq: ["$role", "AGENT"] },
              {
                $size: {
                  $filter: {
                    input: "$donations",
                    as: "item",
                    cond: { $eq: ["$$item.status", "COLLECTED"] }
                  }
                }
              },
              "$$REMOVE"
            ]
          },
          accepted: {
            $cond: [
              { $eq: ["$role", "AGENT"] },
              {
                $size: {
                  $filter: {
                    input: "$donations",
                    as: "item",
                    cond: { $eq: ["$$item.status", "ACCEPTED"] }
                  }
                }
              },
              "$$REMOVE"
            ]
          },
          donated: {
            $cond: [
              { $eq: ["$role", "DONOR"] },
              { $size: "$donations" },
              "$$REMOVE"
            ]
          }
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          address: 1,
          role: 1,
          createdAt: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          phoneNo: 1,
          collected: 1,
          accepted: 1,
          donated: 1
        }
      }
    ]);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};


//update user

/*const editUser = async (req, res, next) => {
  const userId = req.user._id;  // ID of user being edited (usually from token)
  try {
    // Find existing user to get current profile image
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return next(new CustomError("User not found", 404));
    }

    // Update user, but keep old profileImage unchanged
    const result = await userModel.findByIdAndUpdate(
      userId,
      { ...req.body, profileImage: existingUser.profileImage },
      { runValidators: true, new: true }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
*/
const editUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return next(new CustomError("User not found", 404));
    }

    // Decide which profileImage to use
    const profileImage = req.imageData || existingUser.profileImage;

const result = await userModel.findByIdAndUpdate(
  userId,
  {
    ...req.body,
    profileImage
  },
  { runValidators: true, new: true }
);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


module.exports = { addUser, getUsers, editUser, getUser };
