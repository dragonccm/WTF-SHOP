import { getUser} from "../../../lib/actions/user.actions";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET
export const GET = async (request: any) => {
    const token = await getToken({ req: request, secret });

    try {
        const user = await getUser(token?.id);
        if (user.err == "0") {
            console.log("lấy được",user)
            return NextResponse.json({data:user.data}, { status: 200 })
        } else {
            console.log("lỗi lấy user",user)
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
        }   
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
    }
};