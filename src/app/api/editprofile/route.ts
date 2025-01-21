import { checkpass, updateUserAndPass, updateUser } from "../../../lib/actions/user.actions";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET
export const POST = async (request: any) => {
    const resData = await request.json();
    const token = await getToken({ req: request, secret });

    try {
        if (resData.newpassword) {
            const checkPass = await checkpass({ sessionUser: token?.sub, password: resData.oldpassword });
            if (checkPass.err === 0) {
                const changePass = await updateUserAndPass(resData);
                if (changePass.err === 0) {
                    return new NextResponse(JSON.stringify({ message: "Đã Cập Nhật" }), { status: 200 });
                } else {
                    return new NextResponse(JSON.stringify({ message: changePass.tus }), { status: 400 });
                }
            } else {
                return new NextResponse(JSON.stringify({ message: "Hãy Nhập Đúng Mật Khẩu Cũ" }), { status: 400 });
            }
        } else {
            const changeInfo = await updateUser(resData);
            if (changeInfo.err === 0) {
                return new NextResponse(JSON.stringify({ message: "Đã Cập Nhật" }), { status: 200 });
            } else {
                return new NextResponse(JSON.stringify({ message: changeInfo.tus }), { status: 400 });
            }
        }
    } catch (error: any) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Lỗi Kết Nối Máy Chủ" }), { status: 500 });
    }
};