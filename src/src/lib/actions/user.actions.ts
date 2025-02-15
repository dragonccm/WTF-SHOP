"use server"
import UserAccount from "../models/user.model";
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
const createUser = async (data: any) => {
  if (!data || typeof data !== 'object' || !data.username || !data.password || !data.email) {
    return { err: "Dữ liệu đầu vào không hợp lệ" };
  }
  try {
    const users = await UserAccount.findOne({ $or: [{ username: data.username }, { email: data.email }] }, { _id: 1 }).maxTimeMS(50000);
    if (users) {
      return { err: "Người dùng đã tồn tại" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const newUser = new UserAccount({
        profile_photo: data.profile_photo || 'https://i.pinimg.com/originals/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg',
        username: data.username,
        email: data.email,
        password: data.password,
        Phone: data.Phone,
        dob: data.dob,
        hometown: data.hometown,
        role: 0,
      });
      await newUser.save();
      return { err: null, res: `đã có ${newUser}` };
    }
  } catch (error: any) {
    console.error("Error saving user:", error);
    return { err: error.message };
  }
};

const checklogin = async (credentials: any) => {
  if (!credentials || typeof credentials !== 'object' || !credentials.username || !credentials.password) {
    throw new Error("Dữ liệu đăng nhập không hợp lệ.");
  }

  try {
    const user = await UserAccount.findOne({ username: credentials.username });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
      console.log("isPasswordCorrect", isPasswordCorrect);
      if (isPasswordCorrect) {
        const newUser = {
          _id: user._id,
          id: user._id,
          image: user.profile_photo,
          name: user.username,
          email: user.email,
          password: user.password,
          Phone: user.Phone,
          dob: user.dob,
          hometown: user.hometown,
          __v: user.__v,
          accessToken: ''
        };

        return newUser;
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const getUser = async (data: any) => {
  if (!data || typeof data !== 'string') {
    return { err: "Dữ liệu đầu vào không hợp lệ" };
  }
  data = new ObjectId(data);
  try {
    const users = await UserAccount.aggregate([
      { $match: { _id: data } },
      { $project: { password: 0 } }
    ]);
    if (users) {
      return { err: "0", data: users[0] };
    } else {
      return { err: "1", data: "người dùng không tồn tại" };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};

const updateUser = async (data: any) => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return { err: "Session không hợp lệ" };
  }
  try {
    const updateFields: any = {};
    if (data.profile_photo) updateFields.profile_photo = data.profile_photo;
    if (data.username) updateFields.username = data.username;
    if (data.email) updateFields.email = data.email;
    if (data.Phone) updateFields.Phone = data.Phone;
    if (data.dob) updateFields.dob = data.dob;
    if (data.hometown) updateFields.hometown = data.hometown;

    const users = await UserAccount.aggregate([
      { $match: { email: session.user.email } },
      { $project: { _id: 1 } }
    ]);
    if (users.length > 0) {
      const userId = users[0]._id;
      const updatedUser = await UserAccount.findOneAndUpdate(
        { _id: userId },
        updateFields,
        { new: true }
      );
      return { err: 0, tus: updatedUser };
    } else {
      return { err: 1, tus: "lỗi cập nhật" };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};

const updateUserAndPass = async (data: any) => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return { err: "Session không hợp lệ" };
  }
  if (data.newpassword.length >= 6) {
    try {
      const user = await UserAccount.findOne({ email: session.user.email });
      if (!user) {
        return { err: 1, tus: "Người dùng không tồn tại" };
      }

      const isOldPasswordCorrect = await bcrypt.compare(data.oldpassword, user.password);
      if (!isOldPasswordCorrect) {
        return { err: 1, tus: "Mật khẩu cũ không đúng" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.newpassword, salt);

      const updateFields: any = {
        password: hashedPassword,
        // ...other fields...
      };
      if (data.profile_photo) updateFields.profile_photo = data.profile_photo;
      if (data.username) updateFields.username = data.username;
      if (data.email) updateFields.email = data.email;
      if (data.Phone) updateFields.Phone = data.Phone;
      if (data.dob) updateFields.dob = data.dob;
      if (data.hometown) updateFields.hometown = data.hometown;

      const updatedUser = await UserAccount.findOneAndUpdate(
        { _id: user._id },
        updateFields,
        { new: true }
      );

      return { err: 0, tus: updatedUser };
    } catch (error: any) {
      return { err: error.message };
    }
  } else {
    return { err: 1, tus: "Mật khẩu mới quá ngắn" };
  }
};

const updateRole = (data: any) => {
  if (!Array.isArray(data) || data.some(id => typeof id !== 'string')) {
    throw new Error("Dữ liệu đầu vào không hợp lệ.");
  }
  const newarray = data.map((mapid: any) => new ObjectId(mapid).toHexString());

  return Promise.all(newarray.map(async (_id: any) => {
    try {
      const users = await UserAccount.findOne({ _id: _id }, { _id: 1, role: 1 }).maxTimeMS(50000);
      if (users) {
        const realadmin = new ObjectId("6627d547d680edc50362d717").toHexString();
        if (realadmin !== _id) {
          await UserAccount.findOneAndUpdate(
            { _id: _id },
            {
              role: users.role == 1 ? 0 : 1
            },
            { new: true }
          );
          return { err: 0, tus: "user này đổi rồi" };
        } else {
          return { err: 0, tus: "user này là boss ko được đổi" };
        }
      } else {
        return { err: 1, tus: "lỗi cập nhật" };
      }
    } catch (error: any) {
      return { err: error.message };
    }
  }));
};

const checkpass = async (data: any) => {
  if (!data || typeof data !== 'object' || !data.sessionUser || !data.password) {
    return { err: 1, tus: "Dữ liệu đầu vào không hợp lệ" };
  }
  try {
    const user = await UserAccount.findOne({ _id: data.sessionUser });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

      if (isPasswordCorrect) {
        return { err: 0, tus: "success" };
      } else {
        return { err: 1, tus: "password not match" };
      }
    } else {
      return { err: 0, tus: "null user" };
    }
  } catch (error: any) {
    return { err: 1, tus: error.message };
  }
};
const getall = async () => {
  try {
    const user = await UserAccount.findOne({})
    return { err: null, user };
  } catch (error: any) {
    return { err: error.message };
  }
}
export {
  createUser,
  checklogin,
  getUser,
  checkpass,
  updateUserAndPass,
  updateUser,
  updateRole,
  getall
};